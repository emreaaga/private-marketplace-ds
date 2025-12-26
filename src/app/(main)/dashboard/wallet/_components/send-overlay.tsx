"use client";

import dynamic from "next/dynamic";

import { useIsMobile } from "@/shared/hooks/use-mobile";

interface SendOverlayProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  userBalance: number;
}

const SendDialog = dynamic(() => import("./send-dialog").then((m) => m.default), { ssr: false });

const SendDrawer = dynamic(() => import("./send-drawer").then((m) => m.default), { ssr: false });

export default function SendOverlay(props: SendOverlayProps) {
  const isMobile = useIsMobile();

  if (isMobile === null) return null;

  return isMobile ? <SendDrawer {...props} /> : <SendDialog {...props} />;
}
