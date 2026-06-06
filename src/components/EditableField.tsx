"use client";

import { useState, useRef, useEffect } from "react";

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  className?: string;
  inputMode?: "text" | "decimal" | "numeric";
  inputClassName?: string;
  ariaLabel?: string;
  minWidthCh?: number;
  alignClassName?: string;
}

export default function EditableField({
  value,
  onChange,
  isEditing,
  className = "",
  inputMode = "text",
  inputClassName = "",
  ariaLabel,
  minWidthCh,
  alignClassName = "",
}: EditableFieldProps) {
  const [isActive, setIsActive] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const widthCh = Math.max(localValue.length + 1, minWidthCh ?? 0, 3);
  const sharedStyle = minWidthCh ? { minWidth: `${minWidthCh}ch` } : undefined;

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

  const activate = () => {
    if (isEditing) {
      setIsActive(true);
    }
  };

  if (isEditing && isActive) {
    return (
      <input
        ref={inputRef}
        type="text"
        aria-label={ariaLabel}
        inputMode={inputMode}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && commit()}
        className={`bg-white/10 border border-white/30 rounded px-1 py-0.5 outline-none text-white ${alignClassName} ${inputClassName} ${className}`}
        style={{ ...sharedStyle, width: `${widthCh}ch` }}
      />
    );
  }

  const triggerClassName = `inline-block ${alignClassName} ${className} ${
    isEditing ? "border-b border-dashed border-white/40 cursor-pointer" : ""
  }`;

  if (isEditing) {
    return (
      <span
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        onClick={activate}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            activate();
          }
        }}
        className={triggerClassName}
        style={sharedStyle}
      >
        {value}
      </span>
    );
  }

  return (
    <span className={triggerClassName} style={sharedStyle}>
      {value}
    </span>
  );
}
