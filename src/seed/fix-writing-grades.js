/**
 * One-shot migration: fix Writing grades that were stuck at 0.0 in dashboard.
 *
 * Two issues addressed:
 *   1. Writing AI grades were saved with isFinalized=false, so they were
 *      excluded from getMyGrades aggregation (only finalized grades count).
 *      → Mark every grade tied to an "ai_graded" Writing submission as finalized.
 *   2. Writing submissions stuck at "manual_review" because the old AI_MODEL
 *      ("gpt-4o-nano") didn't exist and every AI call silently failed.
 *      → Re-run the AI evaluator on those submissions; if it succeeds, write the
 *        grade and flip status to "ai_graded".
 *
 * Run once after pulling the new code and confirming AI_MODEL=gpt-4o-mini in .env:
 *   node src/seed/fix-writing-grades.js
 */
import "dotenv/config";
import mongoose from "mongoose";
import { config } from "../config/env.js";
import { Submission } from "../models/Submission.js";
import { Grade } from "../models/Grade.js";
import { Task } from "../models/Task.js";
import { evaluateWriting } from "../services/ai-evaluator.service.js";

async function fixFinalizedFlag() {
  // Find all writing submissions that have been AI-graded
  const aiSubs = await Submission.find({ type: "writing", status: "ai_graded" }).select("_id totalScore").lean();
  if (aiSubs.length === 0) {
    console.log("[1/2] No ai_graded writing submissions found.");
    return 0;
  }

  const ids = aiSubs.map((s) => s._id);
  const result = await Grade.updateMany(
    { submissionId: { $in: ids }, isFinalized: { $ne: true } },
    { $set: { isFinalized: true, finalizedAt: new Date() } }
  );
  console.log(`[1/2] Flipped isFinalized on ${result.modifiedCount} grades (out of ${aiSubs.length} ai_graded writings).`);
  return result.modifiedCount;
}

async function reevaluateStuck() {
  const stuck = await Submission.find({ type: "writing", status: "manual_review" }).lean();
  if (stuck.length === 0) {
    console.log("[2/2] No manual_review writings to re-evaluate.");
    return { ok: 0, fail: 0 };
  }
  console.log(`[2/2] Re-evaluating ${stuck.length} stuck writing submissions...`);

  let ok = 0;
  let fail = 0;
  for (const sub of stuck) {
    if (!sub.writing?.text) {
      console.log(`  - skip ${sub._id}: no text`);
      fail++;
      continue;
    }
    const task = await Task.findById(sub.taskId);
    if (!task) {
      console.log(`  - skip ${sub._id}: task missing`);
      fail++;
      continue;
    }

    const aiResult = await evaluateWriting({
      task,
      submission: sub,
      wordCount: sub.writing.wordCount || 0
    });
    if (!aiResult) {
      console.log(`  - fail ${sub._id}: AI returned null`);
      fail++;
      continue;
    }

    await Submission.updateOne(
      { _id: sub._id },
      {
        $set: {
          "writing.aiEvaluation": aiResult,
          totalScore: aiResult.band,
          status: "ai_graded"
        }
      }
    );

    await Grade.findOneAndUpdate(
      { submissionId: sub._id },
      {
        $setOnInsert: {
          submissionId: sub._id,
          studentId: sub.studentId,
          taskId: sub.taskId,
          initialScore: aiResult.band
        },
        $set: {
          finalScore: aiResult.band,
          isFinalized: true,
          finalizedAt: new Date()
        },
        $push: { history: { score: aiResult.band, reason: "ai_reevaluated", at: new Date() } }
      },
      { upsert: true, new: true }
    );

    console.log(`  - ok ${sub._id}: band ${aiResult.band}`);
    ok++;
  }
  return { ok, fail };
}

async function main() {
  await mongoose.connect(config.MONGO_URI);
  console.log("Connected to", config.MONGO_URI);

  const flipped = await fixFinalizedFlag();
  const { ok, fail } = await reevaluateStuck();

  console.log("---");
  console.log(`Summary: ${flipped} grades finalized, ${ok} stuck submissions re-evaluated, ${fail} failed.`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
