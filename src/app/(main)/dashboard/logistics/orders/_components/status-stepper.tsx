"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/atoms/tooltip";

type StepKey =
  | "client_1"
  | "courier_1"
  | "post_a_1"
  | "tas2"
  | "in_transit"
  | "tas1"
  | "post_a_2"
  | "courier_2"
  | "client_2";

type StatusStepperProps = {
  status: StepKey;
  dates?: Partial<Record<StepKey, string>>;
};

const STEP_GAP = 64;
const HEIGHT = 36;
const DOT_Y = 16;
const DOT_WIDTH = 58;
const DOT_HEIGHT = 18;
const DOT_RADIUS_X = 5;
const DOT_PADDING = 30;

const STEPS: StepKey[] = [
  "client_1",
  "courier_1",
  "post_a_1", // IST-A01
  "tas2", // IST-таможня
  "in_transit", // TR–UZ
  "tas1", // TAS-таможня
  "post_a_2",
  "courier_2",
  "client_2",
];

const STEP_BADGE_TEXT: Record<StepKey, { top: string }> = {
  client_1: { top: "CLIENT-1" },
  courier_1: { top: "КУРЬЕР" },
  post_a_1: { top: "IST-A01" },
  tas2: { top: "IST-таможня" },
  in_transit: { top: "TR–UZ" },
  tas1: { top: "TAS-таможня" },
  post_a_2: { top: "TAS-A02" },
  courier_2: { top: "КУРЬЕР" },
  client_2: { top: "SKD-CLIENT" },
};

const ACTIVE = "#1f2937";
const FUTURE = "#e5e7eb";
const FUTURE_TEXT = "#6b7280";

export const StatusStepper = ({ status, dates }: StatusStepperProps) => {
  const activeIndex = STEPS.indexOf(status);
  const width = STEP_GAP * (STEPS.length - 1) + DOT_PADDING * 2;

  return (
    <TooltipProvider delayDuration={150}>
      <div className="relative" style={{ width, height: HEIGHT }}>
        <svg width={width} height={HEIGHT} className="absolute inset-0">
          <defs>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0.75" stdDeviation="0.75" floodColor="#000" floodOpacity="0.05" />
            </filter>
          </defs>

          {STEPS.map((_, i) => {
            if (i === STEPS.length - 1) return null;
            const x1 = DOT_PADDING + i * STEP_GAP;
            const x2 = DOT_PADDING + (i + 1) * STEP_GAP;

            return (
              <line
                key={i}
                x1={x1}
                y1={DOT_Y}
                x2={x2}
                y2={DOT_Y}
                stroke={i < activeIndex ? ACTIVE : FUTURE}
                strokeWidth={i < activeIndex ? 1.75 : 1.25}
                strokeLinecap="round"
              />
            );
          })}

          {STEPS.map((step, i) => {
            const cx = DOT_PADDING + i * STEP_GAP;
            const isActive = i <= activeIndex;

            return (
              <g key={step}>
                <rect
                  x={cx - DOT_WIDTH / 2}
                  y={DOT_Y - DOT_HEIGHT / 2}
                  width={DOT_WIDTH}
                  height={DOT_HEIGHT}
                  rx={DOT_RADIUS_X}
                  fill={isActive ? ACTIVE : "#fff"}
                  stroke={isActive ? "none" : FUTURE}
                  filter={!isActive ? "url(#softShadow)" : undefined}
                />
                <text
                  x={cx}
                  y={DOT_Y + 4}
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="600"
                  fill={isActive ? "#fff" : FUTURE_TEXT}
                >
                  {STEP_BADGE_TEXT[step].top}
                </text>
              </g>
            );
          })}
        </svg>

        {STEPS.map((step, i) => {
          const date = dates?.[step];
          if (!date) return null;

          return (
            <Tooltip key={step}>
              <TooltipTrigger asChild>
                <div
                  style={{
                    position: "absolute",
                    left: DOT_PADDING + i * STEP_GAP - DOT_WIDTH / 2,
                    top: DOT_Y - DOT_HEIGHT / 2,
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
