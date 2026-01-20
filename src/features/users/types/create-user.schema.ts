import { z } from "zod";

export const UserRolesEnum = z.enum(["admin", "company_owner"]);

export type UserRoles = z.infer<typeof UserRolesEnum>;

export const createUserSchema = z.object({
  company_id: z.number().int().positive(),

  name: z.string().min(1, "Имя обязательно"),
  surname: z.string().min(1, "Фамилия обязательна"),

  country: z.string().length(2, "Неверный код страны"),
  city: z.string().min(1, "Город обязателен"),
  district: z.string().min(1, "Район обязателен"),

  address_line: z.string().optional(),

  phone_country_code: z.string().min(1),
  phone_number: z.string().min(5, "Телефон обязателен"),

  role: UserRolesEnum,
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
