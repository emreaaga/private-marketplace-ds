import axios from "axios";

type ApiErrorShape = {
  message?: string;
  error?: string;
};

export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError<ApiErrorShape>(err)) {
    const data = err.response?.data;

    if (data?.message) return data.message;
    if (data?.error) return data.error;

    return "Запрос упал.";
  }

  if (err instanceof Error) {
    return err.message;
  }

  return "Неизвестная ошибка";
}
