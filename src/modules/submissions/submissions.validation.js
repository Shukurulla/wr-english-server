import { z } from "zod";

export const startSchema = z.object({
  body: z.object({
    taskId: z.string().optional(),
    assignmentId: z.string().optional()
  }).refine((v) => v.taskId || v.assignmentId, {
    message: "taskId or assignmentId is required"
  })
});

export const answerReadingSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    answers: z.array(
      z.object({
        questionId: z.string(),
        answer: z.any()
      })
    )
  })
});

export const submitWritingSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    text: z.string().min(1).max(10000),
    meta: z
      .object({
        pasteEvents: z.array(z.any()).optional(),
        totalPastedChars: z.number().optional(),
        typedChars: z.number().optional(),
        tabSwitches: z.array(z.any()).optional()
      })
      .optional()
  })
});

export const saveDraftSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    text: z.string().max(10000)
  })
});

export const listSubmissionsSchema = z.object({
  query: z.object({
    assignmentId: z.string().optional(),
    studentId: z.string().optional(),
    status: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(50)
  })
});
