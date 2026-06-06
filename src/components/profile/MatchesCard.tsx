"use client";

import { useEffect, useRef, useState } from "react";
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
    <div className="px-4 pb-4">
      <div className="rounded-[28px] bg-[#05155E]/55 px-5 py-4 text-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase text-white/60">
              Recent Match
            </p>
            <EditableField
              value={match.adjustment}
              onChange={(value) => onChange("adjustment", value)}
              isEditing={isEditing}
              className="mt-2 text-3xl font-bold text-white"
              inputMode="decimal"
            />
          </div>
          <EditableField
            value={match.date}
            onChange={(value) => onChange("date", value)}
            isEditing={isEditing}
            className="text-right text-sm text-white/75"
          />
        </div>

        <div className="mt-4 rounded-2xl bg-white/10 px-4 py-3">
          <p className="text-xs font-medium uppercase text-white/60">
            Rating Change
          </p>
          <div className="mt-2 flex items-center gap-3 text-white">
            <EditableField
              value={match.ratingStart}
              onChange={(value) => onChange("ratingStart", value)}
              isEditing={isEditing}
              className="text-lg font-semibold text-white"
              inputMode="decimal"
            />
            <PrefixedEditableField
              value={match.ratingEnd}
              onChange={(value) => onChange("ratingEnd", value)}
              isEditing={isEditing}
              prefix="→ "
              className="text-lg font-semibold text-white"
              inputMode="decimal"
            />
          </div>
        </div>
      </div>
    </div>
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
  const [isActive, setIsActive] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isActive]);

  useEffect(() => {
    if (!isEditing) {
      setIsActive(false);
    }
  }, [isEditing]);

  const commit = () => {
    setIsActive(false);
    onChange(localValue);
  };

  if (isEditing && isActive) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        inputMode={inputMode}
        onChange={(event) => setLocalValue(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => event.key === "Enter" && commit()}
        className={`min-w-[5ch] rounded border border-white/30 bg-white/10 px-1 py-0.5 text-white outline-none ${className}`}
      />
    );
  }

  if (isEditing) {
    return (
      <span
        role="button"
        tabIndex={0}
        onClick={() => setIsActive(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsActive(true);
          }
        }}
        className={`inline-block border-b border-dashed border-white/40 cursor-pointer ${className}`}
      >
        {prefix}
        {value}
      </span>
    );
  }

  return (
    <span className={className}>
      {prefix}
      {value}
    </span>
  );
}
