"use client";

import { MessageCircle, Plus, Settings, Share2 } from "lucide-react";
import PhotoUploader from "@/components/PhotoUploader";
import EditableField from "@/components/EditableField";
import { ActiveTab, ProfileData } from "@/lib/types";

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
    <div className="bg-white px-4 pb-2 pt-3 text-[#1f1f1f]">
      <div className="flex items-center justify-between">
        <IconButton label="Settings" icon={<Settings size={23} strokeWidth={2.05} />} />
        <div className="flex items-center gap-3 text-[#1f1f1f]">
          <IconButton label="Add" icon={<Plus size={24} strokeWidth={2} />} />
          <IconButton label="Messages" icon={<MessageCircle size={24} strokeWidth={2} />} />
          <IconButton label="Share" icon={<Share2 size={24} strokeWidth={2} />} />
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <PhotoUploader
          photo={profile.profilePhoto}
          isEditing={isEditing}
          onChange={onPhotoChange}
          className="h-[72px] w-[72px]"
          imageClassName="h-[72px] w-[72px] border-[#f1f2f6]"
          showCameraBadge
          cameraBadgeClassName="h-6 w-6 bg-[#4b76d9]"
        />

        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <EditableField
                value={profile.name}
                onChange={(value) => onFieldChange("name", value)}
                isEditing={isEditing}
                className="block text-[21px] font-semibold leading-none tracking-[-0.03em] text-[#1f1f1f]"
              />
              <div className="mt-1 flex flex-wrap items-center gap-1 text-[15px] leading-tight text-[#8d8f99]">
                <EditableField
                  value={profile.location}
                  onChange={(value) => onFieldChange("location", value)}
                  isEditing={isEditing}
                  className="text-[15px] text-[#8d8f99]"
                />
                <span aria-hidden="true">•</span>
                <EditableField
                  value={profile.gender}
                  onChange={(value) => onFieldChange("gender", value)}
                  isEditing={isEditing}
                  className="text-[15px] text-[#8d8f99]"
                />
              </div>
            </div>

            <div
              aria-label="Followers count"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#f1f2f6] px-3.5 py-2 text-[16px] font-medium text-[#1f1f1f]"
            >
              <PeopleIcon />
              <EditableField
                value={String(profile.followers)}
                onChange={(value) => onFieldChange("followers", value)}
                isEditing={isEditing}
                className="text-[16px] font-medium text-[#1f1f1f]"
                inputMode="numeric"
                ariaLabel="Followers"
                minWidthCh={1}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-end gap-9 border-b border-[#e5e7ef]">
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
        <span className="pb-[14px] text-[16px] font-medium text-[#8d8f99]">Clubs</span>
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
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-b-[3px] pb-[13px] text-[16px] font-medium ${
        active
          ? "border-[#4b76d9] text-[#1f1f1f]"
          : "border-transparent text-[#8d8f99]"
      }`}
    >
      {label}
    </button>
  );
}

function IconButton({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full text-[#1f1f1f]"
    >
      {icon}
    </button>
  );
}

function PeopleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
