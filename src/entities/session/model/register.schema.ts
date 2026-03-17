import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Введите имя."),
    email: z.string().email("Введите корректный email."),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов."),
    confirmPassword: z.string().min(6, "Пароль должен содержать минимум 6 символов."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают.",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const registerDefaultValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
