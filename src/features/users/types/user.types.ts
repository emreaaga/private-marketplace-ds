/**
 * Роли пользователей в системе
 */
export const USER_ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  USER: "user",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

/**
 * Статусы пользователей
 */
export const USER_STATUSES = {
  ACTIVE: "active",
  PENDING: "pending",
  BLOCKED: "blocked",
} as const;

export type UserStatus = (typeof USER_STATUSES)[keyof typeof USER_STATUSES];

/**
 * Основная модель пользователя
 */
export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "manager";
  status: "active" | "pending" | "blocked";
  created_at: string;
};

/**
 * DTO для создания пользователя
 */
export interface CreateUserDto {
  name: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
}

/**
 * DTO для обновления пользователя
 */
export interface UpdateUserDto {
  name?: string;
  role?: UserRole;
  status?: UserStatus;
}

/**
 * Параметры фильтрации пользователей
 */
export interface UsersFilterParams {
  role?: UserRole;
  status?: UserStatus;
  search?: string;
}

/**
 * Type guards для проверки типов
 */
export function isValidUserRole(role: string): role is UserRole {
  return Object.values(USER_ROLES).includes(role as UserRole);
}

export function isValidUserStatus(status: string): status is UserStatus {
  return Object.values(USER_STATUSES).includes(status as UserStatus);
}
