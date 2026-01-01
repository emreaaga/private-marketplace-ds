"use client";

import * as React from "react";

import { toast } from "sonner";

import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/atoms/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/shared/ui/atoms/tabs";

import { PartiesSummary } from "./steps/parties-summary";
import { ProductList } from "./steps/product-list";
import { StepParties } from "./steps/step-parties";
import { emptyParty } from "./types";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

type Step = "parties" | "products";

export function OrderCreateStepperDialog({ open, onOpenChange }: Props) {
  const [step, setStep] = React.useState<Step>("parties");

  const [sender, setSender] = React.useState(emptyParty);
  const [receiver, setReceiver] = React.useState(emptyParty);

  const reset = () => {
    setStep("parties");
    setSender(emptyParty);
    setReceiver(emptyParty);
  };

  const handleCreate = () => {
    toast.success("Заказ создан");
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[70vh] max-h-[600px] w-full max-w-xl flex-col">
        <Tabs value={step} onValueChange={(v) => setStep(v as Step)} className="flex h-full flex-col">
          <DialogTitle className=""></DialogTitle>
          <div className="mt-0 flex justify-center">
            <TabsList className="mb-3 grid grid-cols-2">
              <TabsTrigger value="parties">Участники</TabsTrigger>
              <TabsTrigger value="products">Товары</TabsTrigger>
            </TabsList>
            <Button size="sm" onClick={handleCreate}>
              Сохранить
            </Button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto pr-1">
            <TabsContent value="parties" className="mt-0">
              <StepParties
                sender={sender}
                receiver={receiver}
                onSenderChange={(p) => setSender((s) => ({ ...s, ...p }))}
                onReceiverChange={(p) => setReceiver((r) => ({ ...r, ...p }))}
              />
            </TabsContent>

            <TabsContent value="products" className="mt-0 space-y-3">
              <PartiesSummary />
              <ProductList />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
