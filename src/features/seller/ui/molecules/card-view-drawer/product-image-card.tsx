"use client";

import Image from "next/image";

interface Props {
  photo: string;
  quantity: number;
  name: string;
}

export function ProductImageCard({ photo, quantity, name }: Props) {
  return (
    <div className="relative mx-4 h-[40vh] overflow-hidden rounded-2xl border border-gray-200">
      <Image src={photo} alt={name} fill className="object-cover object-center" priority />

      <div className="absolute top-3 right-3 rounded-lg border border-gray-200 bg-white/80 px-3 py-1 shadow-sm backdrop-blur">
        <p className="text-xs font-medium text-gray-800">{quantity > 0 ? `В наличии: ${quantity}` : "Нет в наличии"}</p>
      </div>
    </div>
  );
}
