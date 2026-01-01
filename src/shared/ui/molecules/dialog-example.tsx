"use client";

import { useState } from "react";

import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import { Button } from "../atoms/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "../atoms/dialog";

export const title = "Create Order Dialog";

const Example = () => {
  const [step, setStep] = useState<0 | 1>(0);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    quantity: 1,
  });

  const reset = () => {
    setStep(0);
    setForm({
      title: "",
      description: "",
      quantity: 1,
    });
  };

  const submit = () => {
    console.log("SUBMIT:", form);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Создать заказ</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogTitle>Создать заказ</DialogTitle>

        <div className="space-y-6">
          <div className="min-h-[220px]">
            {step === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Название заказа</label>
                  <input
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Описание</label>
                  <textarea
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    rows={4}
                    value={form.description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Количество</label>
                  <input
                    type="number"
                    min={1}
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    value={form.quantity}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        quantity: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {[0, 1].map((i) => (
                <div key={i} className={cn("h-2 w-2 rounded-full", i === step ? "bg-foreground" : "bg-muted")} />
              ))}
            </div>

            <div className="flex gap-2">
              {step === 1 && (
                <Button variant="ghost" onClick={() => setStep(0)}>
                  Назад
                </Button>
              )}

              {step === 0 && (
                <Button onClick={() => setStep(1)} disabled={!form.title.trim()}>
                  Далее
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Button>
              )}

              {step === 1 && <Button onClick={submit}>Создать</Button>}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Example;
