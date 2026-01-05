"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/atoms/tooltip";

type StepKey = "client_1" | "courier_1" | "post_a_1" | "in_transit" | "tas" | "post_a_2" | "courier_2" | "client_2";

type StatusStepperProps = {
  status: StepKey;
  dates?: Partial<Record<StepKey, string>>;
};

const DOT_RADIUS = 12;
const STEP_GAP = 56;

const HEIGHT = 44;
const DOT_Y = 16;
const LABEL_Y = 36;

const DOT_WIDTH = 44;
const DOT_HEIGHT = 18;
const DOT_RADIUS_X = 5;

const STEPS: StepKey[] = [
  "client_1",
  "courier_1",
  "post_a_1",
  "in_transit",
  "tas",
  "post_a_2",
  "courier_2",
  "client_2",
];

const STEP_BADGE_TEXT: Record<StepKey, string> = {
  client_1: "CLIENT-1",
  courier_1: "КУРЬЕР",
  post_a_1: "A01",
  in_transit: "В ПУТИ",
  tas: "TAS",
  post_a_2: "A02",
  courier_2: "КУРЬЕР",
  client_2: "CLIENT-2",
};

const STEP_LABEL_TEXT: Partial<Record<StepKey, string>> = {
  post_a_1: "TR-IST",
  tas: "UZ-TAS",
  client_2: "UZ-SKD",
};

export const StatusStepper = ({ status, dates }: StatusStepperProps) => {
  const activeIndex = STEPS.indexOf(status);
  const width = STEP_GAP * (STEPS.length - 1) + DOT_RADIUS * 4;

  return (
    <TooltipProvider delayDuration={150}>
      <div className="relative" style={{ width, height: HEIGHT }}>
        <svg width={width} height={HEIGHT} className="absolute inset-0">
          {STEPS.map((_, i) => {
            if (i >= STEPS.length - 1) return null;

            const x1 = DOT_RADIUS * 2 + i * STEP_GAP;
            const x2 = DOT_RADIUS * 2 + (i + 1) * STEP_GAP;

            return (
              <line
                key={`line-${i}`}
                x1={x1}
                y1={DOT_Y}
                x2={x2}
                y2={DOT_Y}
                stroke={i < activeIndex ? "#000000" : "#e5e7eb"}
                strokeWidth={i < activeIndex ? 2 : 1.5}
                strokeLinecap="round"
              />
            );
          })}

          {STEPS.map((step, i) => {
            const cx = DOT_RADIUS * 2 + i * STEP_GAP;

            const isPast = i < activeIndex;
            const isCurrent = i === activeIndex;
            const isFuture = i > activeIndex;

            const fill = isCurrent || isPast ? "#000000" : "#ffffff";
            const stroke = isFuture ? "#d1d5db" : "none";
            const textColor = isFuture ? "#4a4a4a" : "#ffffff";

            return (
              <g key={step}>
                <rect
                  x={cx - DOT_WIDTH / 2}
                  y={DOT_Y - DOT_HEIGHT / 2}
                  width={DOT_WIDTH}
                  height={DOT_HEIGHT}
                  rx={DOT_RADIUS_X}
                  fill={fill}
                  stroke={stroke}
                />

                <text x={cx} y={DOT_Y + 4} textAnchor="middle" fontSize="8" fontWeight="600" fill={textColor}>
                  {STEP_BADGE_TEXT[step]}
                </text>

                {STEP_LABEL_TEXT[step] && (
                  <text
                    x={cx}
                    y={LABEL_Y}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight={isCurrent ? "500" : "400"}
                    fill="#6b7280"
                  >
                    {STEP_LABEL_TEXT[step]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {STEPS.map((step, i) => {
          const date = dates?.[step];
          if (!date) return null;

          const left = DOT_RADIUS * 2 + i * STEP_GAP - DOT_WIDTH / 2;
          const top = DOT_Y - DOT_HEIGHT / 2;

          return (
            <Tooltip key={step}>
              <TooltipTrigger asChild>
                <div
                  style={{
                    position: "absolute",
                    left,
                    top,
                    width: DOT_WIDTH,
                    height: DOT_HEIGHT,
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
