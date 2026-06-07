"use client";

import EditableField from "@/components/EditableField";
import ProgressRing from "@/components/ProgressRing";
import { TabProfileData } from "@/lib/types";

type RatingHeroProps = {
  tabData: TabProfileData;
  isEditing: boolean;
  onRatingChange: (field: "rating" | "careerHigh", value: string) => void;
  onReliabilityChange: (value: number) => void;
};

export default function RatingHero({
  tabData,
  isEditing,
  onRatingChange,
  onReliabilityChange,
}: RatingHeroProps) {
  return (
    <div className="mx-4 mt-4 overflow-hidden bg-gradient-to-br from-[#4f79e0] via-[#355ec0] to-[#102b8b] px-4 pb-4 pt-4 text-white shadow-[0_18px_40px_rgba(16,40,110,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 pt-1">
          <p className="text-[15px] font-bold leading-none tracking-[-0.02em]">MyDUPR</p>
          <EditableField
            value={tabData.rating}
            onChange={(value) => onRatingChange("rating", value)}
            isEditing={isEditing}
            className="mt-1.5 block text-[56px] font-semibold leading-none tracking-[-0.03em] text-white"
            inputMode="decimal"
          />
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-[17px] font-semibold tracking-[-0.01em] text-white/65">Career High</span>
            <EditableField
              value={tabData.careerHigh}
              onChange={(value) => onRatingChange("careerHigh", value)}
              isEditing={isEditing}
              className="text-[17px] font-semibold tracking-[-0.01em] text-white"
              inputMode="decimal"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 pt-1">
          <ProgressRing
            value={tabData.reliability}
            size={78}
            strokeWidth={6.5}
            color="#70d48c"
            bgColor="rgba(255,255,255,0.35)"
          >
            <div className="flex items-center text-white">
              <EditableField
                value={String(tabData.reliability)}
                onChange={(value) =>
                  onReliabilityChange(Math.min(100, Math.max(0, parseInt(value) || 0)))
                }
                isEditing={isEditing}
                ariaLabel="Rating reliability"
                minWidthCh={2}
                alignClassName="text-center"
                className="text-[22px] font-bold leading-none tracking-[-0.02em] text-white"
                inputMode="numeric"
                inputClassName="!bg-transparent !border-0 !px-0 !py-0 !text-white"
              />
              <span className="text-[22px] font-bold leading-none text-white">%</span>
            </div>
          </ProgressRing>
          <span className="text-[13px] font-medium tracking-[-0.01em] text-white/78">Reliability</span>
        </div>
      </div>

      <div className="mt-4 border-t border-white/20 pt-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[16px] font-bold tracking-[-0.01em]">DUPR Reset</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-[15px] font-medium text-white/70">21/8 matches played</p>
              <span className="rounded-full bg-white/18 px-3 py-1 text-[14px] font-semibold text-white/90">
                Complete
              </span>
            </div>
          </div>

          <span className="text-[30px] leading-none text-white/70">›</span>
        </div>
      </div>
    </div>
  );
}
