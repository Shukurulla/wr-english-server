import { z } from "zod";

export const createAssignmentSchema = z.object({
  body: z.object({
    taskId: z.string(),
    groupId: z.string(),
    semester: z.number().min(1).max(2).optional(),
    academicYear: z.string().optional(),
    opensAt: z.coerce.date(),
    dueAt: z.coerce.date(),
    closesAt: z.coerce.date().optional()
  })
});

export const bulkAssignSchema = z.object({
  body: z.object({
    groupId: z.string(),
    semester: z.number().min(1).max(2).optional(),
    academicYear: z.string().optional(),
    items: z
      .array(
        z.object({
          taskId: z.string(),
          opensAt: z.coerce.date(),
          dueAt: z.coerce.date(),
          closesAt: z.coerce.date().optional()
        })
      )
      .min(1)
  })
});

export const listAssignmentsSchema = z.object({
  query: z.object({
    groupId: z.string().optional(),
    status: z.enum(["upcoming", "open", "closed"]).optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(50)
  })
});

export const updateAssignmentSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    dueAt: z.coerce.date().optional(),
    closesAt: z.coerce.date().optional(),
    isActive: z.boolean().optional()
  })
});
