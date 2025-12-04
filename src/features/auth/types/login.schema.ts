import { z } from "zod";

const IS_DEMO = process.env.NEXT_PUBLIC_DEMO === "true";

export const loginSchema = z.object({
  email: z.string().email("Введите корректный email."),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const loginDefaultValues: LoginFormValues = {
  email: IS_DEMO ? "test@gmail.com" : "",
  password: IS_DEMO ? "test123" : "",
};
