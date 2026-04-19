import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    fullName: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(128),
    role: z.enum(["student", "teacher", "admin"]),
    studentInfo: z
      .object({
        studentId: z.string().optional(),
        groupId: z.string().optional(),
        course: z.number().min(1).max(6).optional(),
        enrollmentYear: z.number().optional()
      })
      .optional(),
    teacherInfo: z
      .object({
        department: z.string().optional(),
        groupIds: z.array(z.string()).optional()
      })
      .optional()
  })
});

export const updateUserSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    fullName: z.string().min(2).max(100).optional(),
    email: z.string().email().optional(),
    role: z.enum(["student", "teacher", "admin"]).optional(),
    isActive: z.boolean().optional(),
    studentInfo: z.any().optional(),
    teacherInfo: z.any().optional()
  })
});

export const listUsersSchema = z.object({
  query: z.object({
    role: z.enum(["student", "teacher", "admin"]).optional(),
    groupId: z.string().optional(),
    isActive: z.enum(["true", "false"]).optional(),
    search: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20)
  })
});
