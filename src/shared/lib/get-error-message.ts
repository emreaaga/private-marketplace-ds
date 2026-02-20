import axios from "axios";

// eslint-disable-next-line complexity
export function getErrorMessage(err: unknown): string {
  const MAX_LENGTH = 150;
  const FALLBACK_MESSAGE = "Произошла ошибка при выполнении запроса";

  if (axios.isAxiosError(err)) {
    const data = err.response?.data;
    const backendMessage = data?.message;

    if (typeof backendMessage === "string" && backendMessage.trim().length > 0) {
      const message = backendMessage.trim();

      return message.length > MAX_LENGTH ? message.substring(0, MAX_LENGTH) + "..." : message;
    }

    if (err.response?.status && err.response.status >= 500) {
      return "Ошибка сервера. Попробуйте позже.";
    }

    return FALLBACK_MESSAGE;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return FALLBACK_MESSAGE;
}
