import { z } from "zod";

export const listGradesSchema = z.object({
  query: z.object({
    semester: z.coerce.number().optional(),
    type: z.enum(["reading", "writing"]).optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(50)
  })
});

export const finalizeSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    score: z.number().optional(),
    comment: z.string().optional()
  })
});

export const overrideSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    score: z.number(),
    reason: z.string().min(5)
  })
});
