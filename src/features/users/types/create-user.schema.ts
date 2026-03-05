import { z } from "zod";

export const UserRolesEnum = z.enum(["company_owner"]);

export type UserRoles = z.infer<typeof UserRolesEnum>;

const locationSchema = z.object({
  country: z.string().regex(/^[a-z]{2}$/, "Код страны должен состоять из 2 маленьких букв"),

  city: z.string().regex(/^[a-z]{3}$/, "Код города должен состоять из 3 маленьких букв"),

  district: z.string().min(1, "Район обязателен").optional().nullable(),
});

export const createUserSchema = z.object({
  company_id: z.number().int().positive("Выберите компанию"),

  name: z.string().min(1, "Имя обязательно"),
  surname: z.string().min(1, "Фамилия обязательна"),

  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),

  location: locationSchema,

  address_line: z.string().optional().nullable(),

  phone_country_code: z.string().regex(/^\d{1,4}$/, "Некорректный код страны"),

  phone_number: z.string().regex(/^\d{5,20}$/, "Телефон должен содержать от 5 до 20 цифр"),

  role: UserRolesEnum,
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
