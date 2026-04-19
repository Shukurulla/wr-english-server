import { z } from "zod";

const readingQuestionSchema = z.object({
  questionType: z.enum(["multiple_choice", "true_false_not_given", "matching_headings"]),
  prompt: z.string().min(1),
  options: z.array(z.string()).optional(),
  correctAnswer: z.any(),
  points: z.number()
});

export const createTaskSchema = z.object({
  body: z.object({
    type: z.enum(["reading", "writing"]),
    semester: z.number().min(1).max(2),
    order: z.number().min(1),
    title: z.string().min(2),
    topic: z.string().optional(),
    maxScore: z.number(),
    reading: z
      .object({
        passage: z.string(),
        questions: z.array(readingQuestionSchema).min(1)
      })
      .optional(),
    writing: z
      .object({
        instructions: z.string(),
        minWords: z.number().optional(),
        maxWords: z.number().optional(),
        timeLimit: z.number().default(1200),
        rubric: z.object({
          semester: z.number(),
          bands: z.array(z.number())
        }),
        guidingQuestions: z.array(z.string()).optional()
      })
      .optional()
  })
});

export const updateTaskSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    title: z.string().optional(),
    topic: z.string().optional(),
    isActive: z.boolean().optional(),
    reading: z.any().optional(),
    writing: z.any().optional()
  })
});

export const listTasksSchema = z.object({
  query: z.object({
    type: z.enum(["reading", "writing"]).optional(),
    semester: z.coerce.number().optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(50)
  })
});
