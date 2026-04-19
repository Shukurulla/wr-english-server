import { z } from "zod";

export const createGroupSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50),
    course: z.number().min(1).max(6),
    semester: z.number().min(1).max(2),
    academicYear: z.string().min(4),
    teacherId: z.string()
  })
});

export const updateGroupSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    name: z.string().min(2).max(50).optional(),
    course: z.number().min(1).max(6).optional(),
    semester: z.number().min(1).max(2).optional(),
    teacherId: z.string().optional(),
    isActive: z.boolean().optional()
  })
});

export const addStudentsSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    studentIds: z.array(z.string()).min(1)
  })
});

export const listGroupsSchema = z.object({
  query: z.object({
    semester: z.coerce.number().optional(),
    academicYear: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20)
  })
});
