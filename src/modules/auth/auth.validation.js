import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1)
  })
});

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(128),
    role: z.literal("student").default("student"),
    studentInfo: z.object({
      studentId: z.string().optional(),
      groupId: z.string().min(1, "Guruhni tanlash majburiy"),
      course: z.number().min(1).max(6).optional(),
      enrollmentYear: z.number().optional()
    })
  })
});

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1)
  })
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(8).max(128)
  })
});
