"use client";

let accessToken: string | null = null;

export const token = {
  get() {
    return accessToken;
  },

  set(value: string) {
    accessToken = value;
  },

  clear() {
    accessToken = null;
  },
};
