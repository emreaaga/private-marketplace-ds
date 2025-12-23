"use client";

import { useEffect, useRef } from "react";

import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  onResult: (value: string) => void;
}

export function QRScanner({ onResult }: QRScannerProps) {
  const readerId = "qr-reader";
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isRunningRef = useRef(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const scanner = new Html5Qrcode(readerId);
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 220 },
        (decodedText) => {
          onResult(decodedText);
          safeStop();
        },
        () => {
          // ошибки декодирования — шум, игнорируем
        },
      )
      .then(() => {
        isRunningRef.current = true;
      })
      .catch(() => {
        // камера недоступна (desktop / отказ)
        isRunningRef.current = false;
      });

    return () => {
      safeStop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const safeStop = () => {
    const scanner = scannerRef.current;

    if (!scanner || !isRunningRef.current) return;

    try {
      scanner.stop();
    } catch {
      // html5-qrcode бросает sync error — глушим
    } finally {
      isRunningRef.current = false;
    }
  };

  return <div id={readerId} className="overflow-hidden rounded-md border" />;
}
