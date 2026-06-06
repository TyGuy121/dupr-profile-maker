"use client";

import PhotoUploader from "@/components/PhotoUploader";
import EditableField from "@/components/EditableField";
import { ProfileData, ActiveTab } from "@/lib/types";

type ProfileHeaderProps = {
  profile: ProfileData;
  activeTab: ActiveTab;
  isEditing: boolean;
  onTabChange: (tab: ActiveTab) => void;
  onFieldChange: (
    field: "name" | "location" | "gender" | "followers",
    value: string
  ) => void;
  onPhotoChange: (dataUrl: string) => void;
};

export default function ProfileHeader({
  profile,
  activeTab,
  isEditing,
  onTabChange,
  onFieldChange,
  onPhotoChange,
}: ProfileHeaderProps) {
  return (
    <div className="px-5 pb-3 pt-5">
      <div className="flex items-start gap-4">
        <PhotoUploader
          photo={profile.profilePhoto}
          isEditing={isEditing}
          onChange={onPhotoChange}
          showCameraBadge
        />
        <div className="min-w-0 flex-1">
          <EditableField
            value={profile.name}
            onChange={(value) => onFieldChange("name", value)}
            isEditing={isEditing}
            className="text-xl font-bold text-white"
          />
          <div className="mt-1 flex flex-wrap items-center gap-1 text-sm text-white/70">
            <EditableField
              value={profile.location}
              onChange={(value) => onFieldChange("location", value)}
              isEditing={isEditing}
              className="text-sm text-white/70"
            />
            <span aria-hidden="true">•</span>
            <EditableField
              value={profile.gender}
              onChange={(value) => onFieldChange("gender", value)}
              isEditing={isEditing}
              className="text-sm text-white/70"
            />
          </div>
          <div className="mt-3 inline-flex items-center rounded-full bg-white/12 px-3 py-1.5 text-sm font-medium text-white">
            <EditableField
              value={String(profile.followers)}
              onChange={(value) => onFieldChange("followers", value)}
              isEditing={isEditing}
              className="text-sm font-semibold text-white"
              inputMode="numeric"
            />
            <span className="ml-1 text-white/75">Followers</span>
          </div>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Profile sections"
        className="mt-4 inline-flex rounded-full bg-white/10 p-1"
      >
        <TabButton
          label="Doubles"
          active={activeTab === "doubles"}
          onClick={() => onTabChange("doubles")}
        />
        <TabButton
          label="Singles"
          active={activeTab === "singles"}
          onClick={() => onTabChange("singles")}
        />
        <span
          aria-disabled="true"
          className="rounded-full px-4 py-2 text-sm font-semibold text-white/45"
        >
          Clubs
        </span>
      </div>
    </div>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      role="tab"
      type="button"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        active ? "bg-white text-[#05155E]" : "text-white/70"
      }`}
    >
      {label}
    </button>
  );
}
