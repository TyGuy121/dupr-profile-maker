"use client";

import { useState, useRef } from "react";
import { ProfileData } from "@/lib/types";
import { defaultProfile } from "@/lib/defaults";
import { captureProfile } from "@/lib/saveAsPhoto";
import EditableField from "./EditableField";
import PhotoUploader from "./PhotoUploader";
import ProgressRing from "./ProgressRing";

export default function DuprProfile() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K]
  ) => {
    setProfile((p) => ({ ...p, [key]: value }));
  };

  const handleSave = async () => {
    if (!captureRef.current) return;
    setIsEditing(false);
    setIsSaving(true);
    // Small delay to let edit mode UI clear
    await new Promise((r) => setTimeout(r, 100));
    try {
      await captureProfile(captureRef.current);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-[430px] mx-auto relative">
      {/* Capture area */}
      <div
        ref={captureRef}
        className="flex-1 flex flex-col"
        style={{
          background: "linear-gradient(180deg, #4A7BF7 0%, #2B4FCF 100%)",
        }}
      >
        {/* Top Banner */}
        <div className="relative overflow-hidden bg-[#1a3a8a] px-4 py-3 flex items-center justify-between">
          <p className="text-white font-semibold text-sm leading-tight max-w-[65%]">
            DUPR Reset Tracking & Updates Coming Soon
          </p>
          <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <polyline points="4,28 12,20 20,24 28,12 36,16" />
              <polyline
                points="28,12 36,12 36,16"
                stroke="#4CAF50"
                strokeWidth="2.5"
              />
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h1 className="text-white text-2xl font-bold">My DUPR</h1>
          <div className="flex items-center gap-4">
            <button className="text-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </button>
            <button className="text-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <button className="text-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 px-5 py-4">
          <PhotoUploader
            photo={profile.profilePhoto}
            isEditing={isEditing}
            onChange={(url) => update("profilePhoto", url)}
          />
          <div className="flex flex-col">
            <EditableField
              value={profile.name}
              onChange={(v) => update("name", v)}
              isEditing={isEditing}
              className="text-white text-xl font-bold"
            />
            <div className="flex items-center gap-1 mt-1">
              <EditableField
                value={profile.location}
                onChange={(v) => update("location", v)}
                isEditing={isEditing}
                className="text-white/60 text-sm"
              />
              <span className="text-white/60 text-sm"> &bull; </span>
              <EditableField
                value={profile.gender}
                onChange={(v) => update("gender", v)}
                isEditing={isEditing}
                className="text-white/60 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-center gap-16 py-3">
          <div className="flex flex-col items-center">
            <EditableField
              value={String(profile.following)}
              onChange={(v) => update("following", parseInt(v) || 0)}
              isEditing={isEditing}
              className="text-white text-lg font-bold"
              inputMode="numeric"
            />
            <span className="text-white/60 text-sm">Following</span>
          </div>
          <div className="flex flex-col items-center">
            <EditableField
              value={String(profile.followers)}
              onChange={(v) => update("followers", parseInt(v) || 0)}
              isEditing={isEditing}
              className="text-white text-lg font-bold"
              inputMode="numeric"
            />
            <span className="text-white/60 text-sm">Followers</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 px-5 py-2">
          <button className="flex-1 border border-white/20 rounded-full py-2.5 text-white text-sm font-medium">
            Share Profile
          </button>
          <button className="flex-1 border border-white/20 rounded-full py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2">
            <span>
              ID:{" "}
              <EditableField
                value={profile.playerId}
                onChange={(v) => update("playerId", v)}
                isEditing={isEditing}
                className="text-white text-sm font-medium"
              />
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </div>

        {/* Purchase Button */}
        <div className="px-5 py-2">
          <button className="w-full border border-white/20 rounded-full py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="8" cy="10" r="1.5" fill="currentColor" />
              <circle cx="16" cy="10" r="1.5" fill="currentColor" />
              <circle cx="12" cy="15" r="1.5" fill="currentColor" />
              <circle cx="9" cy="13" r="1" fill="currentColor" />
              <circle cx="15" cy="13" r="1" fill="currentColor" />
            </svg>
            Purchase Vulcan Balls
          </button>
        </div>

        {/* Ratings Section */}
        <div className="flex gap-4 px-5 py-4">
          {/* Doubles */}
          <div className="bg-white/[0.08] rounded-2xl p-4 flex-shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="text-white text-xs font-medium">Doubles</span>
              <div className="relative ml-1">
                <ProgressRing
                  value={profile.doublesReliability}
                  size={40}
                  strokeWidth={3}
                />
                <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold rotate-90">
                  <EditableField
                    value={String(profile.doublesReliability)}
                    onChange={(v) =>
                      update(
                        "doublesReliability",
                        Math.min(100, Math.max(0, parseInt(v) || 0))
                      )
                    }
                    isEditing={isEditing}
                    className="text-white text-[10px] font-bold"
                    inputMode="numeric"
                    inputClassName="!w-8 text-center text-[10px]"
                  />
                </span>
              </div>
            </div>
            <EditableField
              value={profile.doublesRating}
              onChange={(v) => update("doublesRating", v)}
              isEditing={isEditing}
              className="text-white text-4xl font-bold"
              inputMode="decimal"
            />
          </div>

          {/* Singles */}
          <div className="flex-1 p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white/60"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="text-white/60 text-xs font-medium">Singles</span>
              <div className="relative ml-1">
                <ProgressRing
                  value={profile.singlesReliability}
                  size={40}
                  strokeWidth={3}
                  color="rgba(255,255,255,0.3)"
                />
                {profile.singlesReliability > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold rotate-90">
                    <EditableField
                      value={String(profile.singlesReliability)}
                      onChange={(v) =>
                        update(
                          "singlesReliability",
                          Math.min(100, Math.max(0, parseInt(v) || 0))
                        )
                      }
                      isEditing={isEditing}
                      className="text-white text-[10px] font-bold"
                      inputMode="numeric"
                      inputClassName="!w-8 text-center text-[10px]"
                    />
                  </span>
                )}
              </div>
            </div>
            <EditableField
              value={profile.singlesRating}
              onChange={(v) => update("singlesRating", v)}
              isEditing={isEditing}
              className="text-white/60 text-4xl font-bold"
              inputMode="decimal"
            />
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center gap-6 px-5 py-3">
          <button className="border border-white/30 rounded-full px-5 py-1.5 text-white text-sm font-medium">
            Performance
          </button>
          <button className="text-white/60 text-sm font-medium">
            Activity
          </button>
        </div>

        {/* Spacer to fill remaining space */}
        <div className="flex-1 min-h-[120px]" />

        {/* Bottom Navigation */}
        <div className="flex items-center justify-around py-2 pb-4 border-t border-white/10 bg-[#2B4FCF]">
          <NavItem
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            }
            label="Forecast"
          />
          <NavItem
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            }
            label="Players"
          />
          <NavItem
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
            label="Clubs"
          />
          <NavItem
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            }
            label="Shop"
          />
          <NavItem
            icon={
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 9l6-6 6 6" />
                <path d="M12 3v14" />
                <circle cx="12" cy="21" r="2" />
                <path d="M5 21h14" />
              </svg>
            }
            label="Events"
          />
          <NavItem
            icon={
              <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            }
            label="My DUPR"
            active
          />
        </div>
      </div>

      {/* Controls - outside capture area */}
      <div className="bg-[#1a2a6c] px-5 py-4 flex gap-3">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex-1 rounded-full py-3 text-sm font-semibold ${
            isEditing
              ? "bg-white text-[#2B4FCF]"
              : "bg-white/20 text-white border border-white/20"
          }`}
        >
          {isEditing ? "Done Editing" : "Edit Profile"}
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1 bg-[#4CAF50] text-white rounded-full py-3 text-sm font-semibold disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save as Photo"}
        </button>
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-1 ${
        active ? "text-white" : "text-white/50"
      }`}
    >
      {icon}
      <span className="text-[10px]">{label}</span>
    </div>
  );
}
