"use client";

import { useState, useRef, useEffect } from "react";

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  className?: string;
  inputMode?: "text" | "decimal" | "numeric";
  inputClassName?: string;
}

export default function EditableField({
  value,
  onChange,
  isEditing,
  className = "",
  inputMode = "text",
  inputClassName = "",
}: EditableFieldProps) {
  const [isActive, setIsActive] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isActive]);

  useEffect(() => {
    if (!isEditing) setIsActive(false);
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
        inputMode={inputMode}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && commit()}
        className={`bg-white/10 border border-white/30 rounded px-1 py-0.5 outline-none text-white ${inputClassName} ${className}`}
        style={{ width: `${Math.max(localValue.length + 1, 3)}ch` }}
      />
    );
  }

  return (
    <span
      onClick={() => isEditing && setIsActive(true)}
      className={`${className} ${
        isEditing ? "border-b border-dashed border-white/40 cursor-pointer" : ""
      }`}
    >
      {value}
    </span>
  );
}
