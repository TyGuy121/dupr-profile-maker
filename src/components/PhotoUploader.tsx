"use client";

import { useRef } from "react";
import { resizeImage } from "@/lib/resizeImage";

interface PhotoUploaderProps {
  photo: string;
  isEditing: boolean;
  onChange: (dataUrl: string) => void;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  showCameraBadge?: boolean;
  cameraBadgeClassName?: string;
}

export default function PhotoUploader({
  photo,
  isEditing,
  onChange,
  className = "",
  imageClassName = "",
  overlayClassName = "",
  showCameraBadge = false,
  cameraBadgeClassName = "",
}: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const resized = await resizeImage(file);
      onChange(resized);
    } catch {
      // Keep upload retries possible even if client-side resizing fails.
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className={`relative w-24 h-24 flex-shrink-0 ${className}`}>
      {photo ? (
        <img
          src={photo}
          alt="Profile"
          className={`h-full w-full rounded-full border-[3px] border-white object-cover ${imageClassName}`}
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center rounded-full border-[3px] border-white bg-white/20 ${imageClassName}`}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.5"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      )}
      {showCameraBadge && (
        <div
          className={`absolute right-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-[#05155E] text-white shadow-md ${cameraBadgeClassName}`}
          aria-hidden="true"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </div>
      )}
      {isEditing && (
        <button
          type="button"
          aria-label="Change profile photo"
          className={`absolute inset-0 flex items-center justify-center rounded-full bg-black/40 cursor-pointer ${overlayClassName}`}
          onClick={() => inputRef.current?.click()}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}
