"use client";

import EditableField from "@/components/EditableField";
import { MatchCardData } from "@/lib/types";

type MatchesCardProps = {
  match: MatchCardData;
  isEditing: boolean;
  onChange: (field: keyof MatchCardData, value: string) => void;
};

export default function MatchesCard({
  match,
  isEditing,
  onChange,
}: MatchesCardProps) {
  return (
    <section className="bg-white px-4 py-6">
      <div className="rounded-[28px] border border-[#e4e7ef] bg-white px-5 py-5 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full bg-[#fbf0e2] px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-[#b57b3a]">
            ADJUSTMENT
          </span>
          <EditableField
            value={match.adjustment}
            onChange={(value) => onChange("adjustment", value)}
            isEditing={isEditing}
            className="text-[18px] font-semibold text-[#0ca04d]"
            inputMode="decimal"
          />
        </div>

        <p className="mt-5 text-[18px] font-medium text-[#5b5e69]">
          DUPR Reset March 2026
        </p>

        <div className="mt-10 text-center text-[30px] font-semibold tracking-tight text-[#1f1f1f]">
          <EditableField
            value={match.ratingStart}
            onChange={(value) => onChange("ratingStart", value)}
            isEditing={isEditing}
            className="text-[30px] font-semibold tracking-tight text-[#1f1f1f]"
            inputMode="decimal"
          />
          <span className="mx-2 text-[#1f1f1f]">→</span>
          <PrefixedEditableField
            value={match.ratingEnd}
            onChange={(value) => onChange("ratingEnd", value)}
            isEditing={isEditing}
            prefix=""
            className="text-[30px] font-semibold tracking-tight text-[#1f1f1f]"
            inputMode="decimal"
          />
        </div>

        <div className="mt-10 text-right text-[18px] font-medium text-[#b4b7c1]">
          <EditableField
            value={match.date}
            onChange={(value) => onChange("date", value)}
            isEditing={isEditing}
            className="text-[18px] font-medium text-[#b4b7c1]"
          />
        </div>
      </div>
    </section>
  );
}

function PrefixedEditableField({
  value,
  onChange,
  isEditing,
  prefix,
  className,
  inputMode,
}: {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  prefix: string;
  className: string;
  inputMode: "text" | "decimal" | "numeric";
}) {
  if (!isEditing) {
    return <span className={className}>{prefix}{value}</span>;
  }

  return (
    <EditableField
      value={`${prefix}${value}`}
      onChange={onChange}
      isEditing={isEditing}
      className={className}
      inputMode={inputMode}
    />
  );
}
