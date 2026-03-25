"use client";

import { useRef } from "react";
import { resizeImage } from "@/lib/resizeImage";

interface PhotoUploaderProps {
  photo: string;
  isEditing: boolean;
  onChange: (dataUrl: string) => void;
}

export default function PhotoUploader({
  photo,
  isEditing,
  onChange,
}: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const resized = await resizeImage(file);
    onChange(resized);
    e.target.value = "";
  };

  return (
    <div
      className="relative w-24 h-24 flex-shrink-0"
      onClick={() => isEditing && inputRef.current?.click()}
    >
      {photo ? (
        <img
          src={photo}
          alt="Profile"
          className="w-24 h-24 rounded-full border-[3px] border-white object-cover"
        />
      ) : (
        <div className="w-24 h-24 rounded-full border-[3px] border-white bg-white/20 flex items-center justify-center">
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
      {isEditing && (
        <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center cursor-pointer">
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
        </div>
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
