import { z } from "zod";

export const createFinalTestSchema = z.object({
  body: z.object({
    semester: z.number().min(1).max(2),
    academicYear: z.string(),
    title: z.string(),
    totalQuestions: z.number().default(20),
    pointsPerQuestion: z.number().default(0.1),
    timeLimit: z.number().default(1200),
    questions: z
      .array(
        z.object({
          prompt: z.string(),
          options: z.array(z.string()).min(2),
          correctAnswerIndex: z.number().min(0)
        })
      )
      .min(1)
  })
});

export const submitFinalTestSchema = z.object({
  body: z.object({
    attemptId: z.string(),
    answers: z.array(
      z.object({
        questionId: z.string(),
        selectedIndex: z.number()
      })
    )
  })
});

export const grantAttemptSchema = z.object({
  body: z.object({
    studentId: z.string(),
    semester: z.coerce.number().min(1).max(2)
  })
});
