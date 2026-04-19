import { z } from "zod";

export const createComplaintSchema = z.object({
  body: z.object({
    submissionId: z.string(),
    reason: z.string().min(20).max(1000)
  })
});

export const resolveComplaintSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    decision: z.enum(["increased", "decreased", "unchanged"]),
    newScore: z.number().optional(),
    teacherComment: z.string().min(5)
  })
});
