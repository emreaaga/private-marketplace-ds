"use client";
import axios from "axios";

import { token } from "@/features/auth/api/token";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = token.get();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
