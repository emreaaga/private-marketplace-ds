import { cookies } from "next/headers";

import axios from "axios";

export const apiServer = axios.create({
  baseURL: process.env.INTERNAL_API_URL ?? process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

apiServer.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
