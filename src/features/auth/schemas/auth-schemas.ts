import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "auth.invalidEmail" }),
  password: z.string().min(1, { message: "auth.required" }),
});

export const registerSchema = z.object({
  name: z.string().min(2, { message: "auth.nameMinLength" }),
  email: z.email({ message: "auth.invalidEmail" }),
  password: z.string().min(6, { message: "auth.passwordMinLength" }),
  phone: z.string().min(1, { message: "auth.required" }),
  title: z.string().min(2, { message: "auth.titleMinLength" }),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
