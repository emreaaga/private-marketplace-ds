"use client";
import axios from "axios";

import { token } from "./token";

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = token.get();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
