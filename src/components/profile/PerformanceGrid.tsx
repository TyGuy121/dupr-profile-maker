import EditableField from "@/components/EditableField";
import { PerformanceStats } from "@/lib/types";

const performanceCards = [
  { key: "mixedRating", label: "Mixed Rating" },
  { key: "record", label: "Record (W-L)" },
  { key: "avgPartner", label: "Avg Partner" },
  { key: "avgOpponent", label: "Avg Opponent" },
  { key: "avgPointsWon", label: "Avg Points Won" },
] as const;

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
    <div className="grid grid-cols-2 gap-3 px-4 py-4">
      {performanceCards.map(({ key, label }) => (
        <div
          key={key}
          className={`rounded-2xl bg-white/10 px-4 py-3 text-white ${
            key === "avgPointsWon" ? "col-span-2" : ""
          }`}
        >
          <p className="text-xs font-medium text-white/60">{label}</p>
          <EditableField
            value={performance[key]}
            onChange={(value) => onChange(key, value)}
            isEditing={isEditing}
            className="mt-2 text-lg font-semibold text-white"
          />
        </div>
      ))}
    </div>
  );
}
