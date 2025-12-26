"use client";

import dynamic from "next/dynamic";

import { useIsMobile } from "@/shared/hooks/use-mobile";
import { LoadingPlaceholder } from "@/shared/ui/molecules/loading-placeholder";

interface ReceiveOverlayProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  receiveUrl: string;
}

const ReceiveDialog = dynamic(() => import("./receive-dialog"), { ssr: false });

const ReceiveDrawer = dynamic(() => import("./receive-drawer"), { ssr: false });

export default function ReceiveOverlay(props: ReceiveOverlayProps) {
  const isMobile = useIsMobile();

  if (isMobile === null) return <LoadingPlaceholder />;

  return isMobile ? <ReceiveDrawer {...props} /> : <ReceiveDialog {...props} />;
}
