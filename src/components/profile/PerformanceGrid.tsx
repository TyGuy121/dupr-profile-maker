"use client";

import EditableField from "@/components/EditableField";
import { PerformanceStats } from "@/lib/types";

type PerformanceCard = {
  key: keyof PerformanceStats;
  label: string;
  showInfo?: boolean;
};

const performanceCards: PerformanceCard[] = [
  { key: "mixedRating", label: "Mixed Rating", showInfo: true },
  { key: "record", label: "Record (W-L)" },
  { key: "avgPartner", label: "Avg Partner" },
  { key: "avgOpponent", label: "Avg Opponent" },
  { key: "avgPointsWon", label: "Avg Points Won" },
];

type PerformanceGridProps = {
  performance: PerformanceStats;
  isEditing: boolean;
  onChange: (field: keyof PerformanceStats, value: string) => void;
};

export default function PerformanceGrid({
  performance,
  isEditing,
  onChange,
}: PerformanceGridProps) {
  return (
    <section className="bg-white px-4 pt-5">
      <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#1f1f1f]">Performance</h2>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {performanceCards.map(({ key, label, showInfo }) => (
          <div
            key={key}
            className="min-h-[116px] rounded-[20px] bg-[#f4f4f6] px-4 py-4 text-[#1f1f1f]"
          >
            <div className="flex items-center gap-1 text-[25px] font-semibold leading-none tracking-[-0.02em]">
              <EditableField
                value={performance[key]}
                onChange={(value) => onChange(key, value)}
                isEditing={isEditing}
                className="text-[25px] font-semibold leading-none tracking-[-0.02em] text-[#1f1f1f]"
              />
              {showInfo ? <InfoIcon /> : null}
            </div>
            <p className="mt-2 text-[14px] leading-tight text-[#8d8f99]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function InfoIcon() {
  return (
    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#1f1f1f] text-[10px] leading-none text-[#1f1f1f]">
      i
    </span>
  );
}
