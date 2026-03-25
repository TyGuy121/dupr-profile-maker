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
  const [activeCard, setActiveCard] = useState<"doubles" | "singles">("doubles");
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
          background: "linear-gradient(225deg, rgba(75,151,254,1) 0%, rgba(1,99,208,1) 40%, rgba(5,21,94,1) 87%)",
        }}
      >
        {/* Top Banner */}
        <div className="relative overflow-hidden bg-[#000D34] px-4 py-3 flex items-center justify-between">
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
          <div className="flex items-center gap-3">
            {/* Plus */}
            <button className="bg-white/25 rounded-full w-11 h-11 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" />
              </svg>
            </button>
            {/* Chat */}
            <button className="bg-white/25 rounded-full w-11 h-11 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
              </svg>
            </button>
            {/* Gear */}
            <button className="bg-white/25 rounded-full w-11 h-11 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.02 7.02 0 0 0-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.47.47 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.37 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 0 1 8.4 12 3.6 3.6 0 0 1 12 8.4a3.6 3.6 0 0 1 3.6 3.6 3.6 3.6 0 0 1-3.6 3.6z" />
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
          <button className="flex-1 bg-white/[0.15] rounded-full py-2.5 text-white text-sm font-medium">
            Share Profile
          </button>
          <button className="flex-1 bg-white/[0.15] rounded-full py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2">
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
          <button className="w-full bg-white/[0.15] rounded-full py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              {/* White filled ball */}
              <circle cx="12" cy="12" r="10" fill="white" />
              {/* Pickleball holes — staggered grid, holes show as blue cutouts */}
              <circle cx="8.5" cy="7.5" r="1.15" fill="rgba(30,90,210,0.55)" />
              <circle cx="12" cy="7.5" r="1.15" fill="rgba(30,90,210,0.55)" />
              <circle cx="15.5" cy="7.5" r="1.15" fill="rgba(30,90,210,0.55)" />
              <circle cx="6.8" cy="10.5" r="1.15" fill="rgba(30,90,210,0.55)" />
              <circle cx="10.3" cy="10.5" r="1.15" fill="rgba(30,90,210,0.55)" />
              <circle cx="13.7" cy="10.5" r="1.15" fill="rgba(30,90,210,0.55)" />
              <circle cx="17.2" cy="10.5" r="1.15" fill="rgba(30,90,210,0.55)" />
              <circle cx="8.5" cy="13.5" r="1.15" fill="rgba(30,90,210,0.55)" />
              <circle cx="12" cy="13.5" r="1.15" fill="rgba(30,90,210,0.55)" />
              <circle cx="15.5" cy="13.5" r="1.15" fill="rgba(30,90,210,0.55)" />
              <circle cx="9.5" cy="16.5" r="1.15" fill="rgba(30,90,210,0.55)" />
              <circle cx="13" cy="16.5" r="1.15" fill="rgba(30,90,210,0.55)" />
            </svg>
            Purchase Vulcan Balls
          </button>
        </div>

        {/* Ratings Section */}
        <div className="flex gap-3 px-4 py-3">
          {/* Doubles */}
          <div
            className={`flex-1 rounded-2xl px-4 py-3 cursor-pointer transition-all ${activeCard === "doubles" ? "bg-white/[0.12]" : "bg-white/[0.06]"}`}
            onClick={() => setActiveCard("doubles")}
          >
            <div className="flex items-center gap-2 mb-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={activeCard === "doubles" ? "white" : "rgba(255,255,255,0.6)"}
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className={`text-xs font-medium ${activeCard === "doubles" ? "text-white" : "text-white/60"}`}>Doubles</span>
              <div className="relative ml-auto">
                <ProgressRing
                  value={profile.doublesReliability}
                  size={38}
                  strokeWidth={5}
                  color={activeCard === "doubles" ? undefined : "rgba(255,255,255,0.3)"}
                />
                <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">
                  <EditableField
                    value={String(profile.doublesReliability)}
                    onChange={(v) =>
                      update(
                        "doublesReliability",
                        Math.min(100, Math.max(0, parseInt(v) || 0))
                      )
                    }
                    isEditing={isEditing && activeCard === "doubles"}
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
              isEditing={isEditing && activeCard === "doubles"}
              className={`text-4xl font-bold ${activeCard === "doubles" ? "text-white" : "text-white/60"}`}
              inputMode="decimal"
            />
          </div>

          {/* Singles */}
          <div
            className={`flex-1 rounded-2xl px-4 py-3 cursor-pointer transition-all ${activeCard === "singles" ? "bg-white/[0.12]" : "bg-white/[0.06]"}`}
            onClick={() => setActiveCard("singles")}
          >
            <div className="flex items-center gap-2 mb-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={activeCard === "singles" ? "white" : "rgba(255,255,255,0.6)"}
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className={`text-xs font-medium ${activeCard === "singles" ? "text-white" : "text-white/60"}`}>Singles</span>
              <div className="relative ml-auto">
                <ProgressRing
                  value={profile.singlesReliability}
                  size={38}
                  strokeWidth={5}
                  color={activeCard === "singles" ? undefined : "rgba(255,255,255,0.3)"}
                />
                {(profile.singlesReliability > 0 || activeCard === "singles") && (
                  <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">
                    <EditableField
                      value={String(profile.singlesReliability)}
                      onChange={(v) =>
                        update(
                          "singlesReliability",
                          Math.min(100, Math.max(0, parseInt(v) || 0))
                        )
                      }
                      isEditing={isEditing && activeCard === "singles"}
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
              isEditing={isEditing && activeCard === "singles"}
              className={`text-4xl font-bold ${activeCard === "singles" ? "text-white" : "text-white/60"}`}
              inputMode="decimal"
            />
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex items-center gap-6 px-5 py-3">
          <button className="bg-white rounded-full px-5 py-1.5 text-[#05155E] text-sm font-semibold">
            Performance
          </button>
          <button className="text-white/60 text-sm font-medium">
            Activity
          </button>
        </div>

        {/* Spacer to fill remaining space */}
        <div className="flex-1 min-h-[120px]" />

        {/* Bottom Navigation */}
        <div className="flex items-center justify-around py-2 pb-4 border-t border-white/10 bg-[#05155E]">
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
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
                <line x1="2" y1="20" x2="22" y2="20" />
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
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                <path d="M7 4h10v8a5 5 0 0 1-10 0V4z" />
                <path d="M7 8H4a2 2 0 0 0 0 4h3" />
                <path d="M17 8h3a2 2 0 0 1 0 4h-3" />
              </svg>
            }
            label="Events"
          />
          <NavItem
            icon={
              profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt="avatar"
                  className="w-6 h-6 rounded-full object-cover border border-white/60"
                />
              ) : (
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
              )
            }
            label="My DUPR"
            active
          />
        </div>
      </div>

      {/* Controls - outside capture area */}
      <div className="bg-[#000D34] px-5 py-4 flex gap-3">
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
