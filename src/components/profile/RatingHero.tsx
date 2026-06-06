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
    <div className="mx-4 rounded-[28px] bg-white/10 px-5 py-5 text-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-white/65">
            DUPR Rating
          </p>
          <EditableField
            value={tabData.rating}
            onChange={(value) => onRatingChange("rating", value)}
            isEditing={isEditing}
            className="mt-2 text-5xl font-bold leading-none text-white"
            inputMode="decimal"
          />
        </div>
        <ProgressRing value={tabData.reliability} size={72} strokeWidth={6}>
          <EditableField
            value={String(tabData.reliability)}
            onChange={(value) =>
              onReliabilityChange(Math.min(100, Math.max(0, parseInt(value) || 0)))
            }
            isEditing={isEditing}
            ariaLabel="Rating reliability"
            minWidthCh={3}
            alignClassName="text-center"
            className="text-xs font-bold text-white"
            inputMode="numeric"
            inputClassName="!bg-transparent !border-0 !px-0 !py-0"
          />
        </ProgressRing>
      </div>

      <div className="mt-5 rounded-2xl bg-black/15 px-4 py-3">
        <p className="text-xs uppercase tracking-wide text-white/60">Career High</p>
        <EditableField
          value={tabData.careerHigh}
          onChange={(value) => onRatingChange("careerHigh", value)}
          isEditing={isEditing}
          className="mt-1 text-xl font-semibold text-white"
          inputMode="decimal"
        />
      </div>
    </div>
  );
}
