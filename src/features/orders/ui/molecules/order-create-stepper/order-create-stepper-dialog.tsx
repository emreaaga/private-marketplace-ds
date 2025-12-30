"use client";

import * as React from "react";

import { toast } from "sonner";

import { Button } from "@/shared/ui/atoms/button";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/atoms/dialog";

import { StepperDots } from "./stepper-dots";
import { PartiesSummary } from "./steps/parties-summary";
import { ProductList } from "./steps/product-list";
import { StepParties } from "./steps/step-parties";
import { Step, emptyParty } from "./types";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export function OrderCreateStepperDialog({ open, onOpenChange }: Props) {
  const [step, setStep] = React.useState<Step>(0);

  const [sender, setSender] = React.useState(emptyParty);
  const [receiver, setReceiver] = React.useState(emptyParty);

  const next = () => setStep(1);
  const prev = () => setStep(0);

  const handleCreate = () => {
    toast.success("Заказ создан");
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) {
          setStep(0);
          setSender(emptyParty);
          setReceiver(emptyParty);
        }
      }}
    >
      <DialogContent className="flex h-[70vh] max-h-[600px] w-full max-w-xl flex-col">
        <DialogTitle className="shrink-0">Создать заказ</DialogTitle>

        <div className="flex min-h-0 flex-1 flex-col space-y-4">
          {step === 0 && (
            <StepParties
              sender={sender}
              receiver={receiver}
              onSenderChange={(p) => setSender((s) => ({ ...s, ...p }))}
              onReceiverChange={(p) => setReceiver((r) => ({ ...r, ...p }))}
            />
          )}

          {step === 1 && (
            <>
              <PartiesSummary />
              <ProductList />
            </>
          )}

          <div className="flex justify-center pt-2">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" disabled={step === 0} onClick={prev}>
                Назад
              </Button>

              <StepperDots step={step} total={2} />

              <Button size="sm" onClick={step === 0 ? next : handleCreate}>
                {step === 0 ? "Далее" : "Создать"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
