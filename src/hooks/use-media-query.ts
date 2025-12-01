// hooks/use-media-query.ts
"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Используем функцию для обновления состояния
    const updateMatch = () => setMatches(media.matches);

    // Инициализируем значение
    updateMatch();

    // Слушаем изменения
    media.addEventListener("change", updateMatch);

    return () => media.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
}
