"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/shared/ui/atoms/drawer";

import { ReceiveForm } from "./receive-form";

interface ReceiveDrawerProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  receiveUrl: string;
}

export default function ReceiveDrawer({ open, onOpenChange, receiveUrl }: ReceiveDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="pb-safe">
        <DrawerHeader>
          <DrawerTitle>Получить средства</DrawerTitle>
        </DrawerHeader>

        <ReceiveForm receiveUrl={receiveUrl} />
      </DrawerContent>
    </Drawer>
  );
}
