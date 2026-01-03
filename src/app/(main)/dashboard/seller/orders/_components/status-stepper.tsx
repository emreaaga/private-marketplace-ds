"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/atoms/tooltip";

import type { OrderStatus } from "./orders.type";

type StatusStepperProps = {
  status: OrderStatus;
  dates?: Partial<Record<OrderStatus, string>>;
};

const DOT_RADIUS = 8;
const STEP_GAP = 50;

const HEIGHT = 34;
const DOT_Y = 18;
const LABEL_Y = 32;

const STEPS: OrderStatus[] = ["created", "in_transit", "at_hub", "with_courier", "delivered"];

const STEP_LABELS: Record<OrderStatus, string> = {
  created: "Создан",
  in_transit: "В пути",
  at_hub: "Склад",
  with_courier: "Курьер",
  delivered: "Готов",
  canceled: "Отменён",
};

const STEP_CODES: Partial<Record<OrderStatus, string>> = {
  created: "IST",
  at_hub: "TAS",
  delivered: "SKD",
};

export const StatusStepper = ({ status, dates }: StatusStepperProps) => {
  if (status === "canceled") {
    return <span className="text-[10px] font-medium text-gray-600">Отменён</span>;
  }

  const activeIndex = STEPS.indexOf(status);
  const width = STEP_GAP * (STEPS.length - 1) + DOT_RADIUS * 4;

  return (
    <TooltipProvider delayDuration={150}>
      <div className="relative" style={{ width, height: HEIGHT }}>
        <svg width={width} height={HEIGHT} viewBox={`0 0 ${width} ${HEIGHT}`} className="absolute inset-0">
          {STEPS.map((step, i) => {
            if (i >= STEPS.length - 1) return null;

            const x1 = DOT_RADIUS * 2 + i * STEP_GAP;
            const x2 = DOT_RADIUS * 2 + (i + 1) * STEP_GAP;
            const isPast = i < activeIndex;

            return (
              <g key={`line-${step}`}>
                <line x1={x1} y1={DOT_Y} x2={x2} y2={DOT_Y} stroke="#e5e7eb" strokeWidth={1.5} strokeLinecap="round" />
                {isPast && (
                  <line x1={x1} y1={DOT_Y} x2={x2} y2={DOT_Y} stroke="#000000" strokeWidth={2} strokeLinecap="round" />
                )}
              </g>
            );
          })}

          {STEPS.map((step, i) => {
            const cx = DOT_RADIUS * 2 + i * STEP_GAP;

            const isPast = i < activeIndex;
            const isCurrent = i === activeIndex;
            const isCompleted = i <= activeIndex;
            const isFirst = i === 0;
            const isLast = i === STEPS.length - 1;

            let dotColor = "#d1d5db";
            let labelColor = "#9ca3af";

            if (isCurrent) {
              dotColor = "#000000";
              labelColor = "#000000";
            } else if (isPast) {
              dotColor = "#000000";
              labelColor = "#525252";
            }

            return (
              <g key={step}>
                <circle cx={cx} cy={DOT_Y} r={DOT_RADIUS} fill={dotColor} />

                {isCompleted &&
                  (STEP_CODES[step] ? (
                    <text
                      x={cx}
                      y={DOT_Y + 4}
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="600"
                      fill="white"
                      className="pointer-events-none select-none"
                    >
                      {STEP_CODES[step]}
                    </text>
                  ) : (
                    isPast && (
                      <path
                        d={`M ${cx - 2.5} ${DOT_Y}
                            L ${cx - 0.8} ${DOT_Y + 2}
                            L ${cx + 2.8} ${DOT_Y - 2.2}`}
                        stroke="white"
                        strokeWidth={1.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    )
                  ))}

                <text
                  x={isFirst ? cx - DOT_RADIUS * 2 : isLast ? cx + DOT_RADIUS * 2 : cx}
                  y={LABEL_Y}
                  textAnchor={isFirst ? "start" : isLast ? "end" : "middle"}
                  fontSize="9"
                  fontWeight={isCurrent ? "500" : "400"}
                  fill={labelColor}
                  className="select-none"
                >
                  {STEP_LABELS[step]}
                </text>
              </g>
            );
          })}
        </svg>

        {STEPS.map((step, i) => {
          const date = dates?.[step];
          if (!date) return null;

          const left = DOT_RADIUS * 2 + i * STEP_GAP - DOT_RADIUS;
          const top = DOT_Y - DOT_RADIUS;

          return (
            <Tooltip key={`tooltip-${step}`}>
              <TooltipTrigger asChild>
                <div
                  className="absolute"
                  style={{
                    left,
                    top,
                    width: DOT_RADIUS * 2,
                    height: DOT_RADIUS * 2,
                  }}
                />
              </TooltipTrigger>
              <TooltipContent side="top">
                <span className="text-[11px]">{date}</span>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};
