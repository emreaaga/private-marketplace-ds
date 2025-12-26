"use client";

import { Button } from "@/shared/ui/atoms/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/shared/ui/atoms/drawer";

import SendForm from "./send-form";

interface SendDrawerProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  userBalance: number;
}

export default function SendDrawer({ open, onOpenChange, userBalance }: SendDrawerProps) {
  const handleSubmit = () => {
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="pb-safe flex flex-col">
        <DrawerHeader>
          <DrawerTitle>Отправить средства</DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4">
          <SendForm userBalance={userBalance} />
        </div>

        <div className="bg-background border-t px-4 py-3">
          <Button size="lg" className="w-full" onClick={handleSubmit}>
            Отправить
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
