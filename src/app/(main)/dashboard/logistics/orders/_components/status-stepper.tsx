"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/atoms/tooltip";

import { stepIcons } from "./step-icons";

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
const DOT_Y = 18;
const DOT_WIDTH = 56;
const DOT_HEIGHT = 24;
const DOT_RADIUS = DOT_HEIGHT / 2;
const DOT_PADDING = 30;

const STEPS: StepKey[] = [
  "client_1",
  "courier_1",
  "post_a_1",
  "tas2",
  "in_transit",
  "tas1",
  "post_a_2",
  "courier_2",
  "client_2",
];

const STEP_BADGE_TEXT: Record<StepKey, string> = {
  client_1: "Клнт.",
  courier_1: "Курь.",
  post_a_1: "Почт.",
  tas2: "Тамж.",
  in_transit: "Рейс",
  tas1: "Тамж.",
  post_a_2: "Почт.",
  courier_2: "Курь.",
  client_2: "Клнт.",
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
          {/* LINES */}
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

          {/* BADGES */}
          {STEPS.map((step, i) => {
            const cx = DOT_PADDING + i * STEP_GAP;
            const isActive = i <= activeIndex;
            const Icon = stepIcons[step];

            return (
              <g key={step}>
                {/* PILL */}
                <rect
                  x={cx - DOT_WIDTH / 2}
                  y={DOT_Y - DOT_HEIGHT / 2}
                  width={DOT_WIDTH}
                  height={DOT_HEIGHT}
                  rx={DOT_RADIUS}
                  fill={isActive ? ACTIVE : "#fff"}
                  stroke={isActive ? "none" : FUTURE}
                />

                {/* ICON + TEXT */}
                <foreignObject x={cx - DOT_WIDTH / 2} y={DOT_Y - DOT_HEIGHT / 2} width={DOT_WIDTH} height={DOT_HEIGHT}>
                  <div className="flex h-full w-full items-center justify-center gap-1">
                    <Icon size={12} color={isActive ? "#fff" : FUTURE_TEXT} />
                    <span
                      style={{
                        fontSize: "8px",
                        fontWeight: 600,
                        color: isActive ? "#fff" : FUTURE_TEXT,
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {STEP_BADGE_TEXT[step]}
                    </span>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        {/* TOOLTIPS */}
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
