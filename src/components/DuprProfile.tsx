"use client";

import { useRef, useState } from "react";
import {
  ActiveTab,
  MatchCardData,
  PerformanceStats,
  ProfileData,
  TabProfileData,
} from "@/lib/types";
import { defaultProfile } from "@/lib/defaults";
import { captureProfile } from "@/lib/saveAsPhoto";
import ProfileHeader from "./profile/ProfileHeader";
import RatingHero from "./profile/RatingHero";
import PerformanceGrid from "./profile/PerformanceGrid";
import MatchesCard from "./profile/MatchesCard";

export default function DuprProfile() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [activeTab, setActiveTab] = useState<ActiveTab>("doubles");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  const currentTab = profile[activeTab];

  const update = <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
    setProfile((p) => ({ ...p, [key]: value }));
  };

  const updateProfileField = (
    field: "name" | "location" | "gender" | "followers",
    value: string
  ) => {
    if (field === "followers") {
      update("followers", parseInt(value, 10) || 0);
      return;
    }

    update(field, value);
  };

  const updateCurrentTab = (field: "rating" | "careerHigh", value: string) => {
    setProfile((previous) => {
      const nextTab = {
        ...previous[activeTab],
        [field]: value,
      };
      const nextProfile: ProfileData = {
        ...previous,
        [activeTab]: nextTab,
      };

      if (field === "rating") {
        if (activeTab === "doubles") {
          nextProfile.doublesRating = value;
        } else {
          nextProfile.singlesRating = value;
        }
      }

      return nextProfile;
    });
  };

  const updateCurrentReliability = (value: number) => {
    setProfile((previous) => {
      const nextTab = {
        ...previous[activeTab],
        reliability: value,
      };
      const nextProfile: ProfileData = {
        ...previous,
        [activeTab]: nextTab,
      };

      if (activeTab === "doubles") {
        nextProfile.doublesReliability = value;
      } else {
        nextProfile.singlesReliability = value;
      }

      return nextProfile;
    });
  };

  const updateTabField = <K extends keyof TabProfileData>(
    field: K,
    value: TabProfileData[K]
  ) => {
    setProfile((previous) => ({
      ...previous,
      [activeTab]: {
        ...previous[activeTab],
        [field]: value,
      },
    }));
  };

  const updatePerformanceField = (field: keyof PerformanceStats, value: string) => {
    updateTabField("performance", {
      ...currentTab.performance,
      [field]: value,
    });
  };

  const updateMatchField = (field: keyof MatchCardData, value: string) => {
    updateTabField("match", {
      ...currentTab.match,
      [field]: value,
    });
  };

  const handleSave = async () => {
    if (!captureRef.current) return;
    setIsEditing(false);
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
    try {
      await captureProfile(captureRef.current);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#1f1f1f]">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-white">
        <div ref={captureRef} data-capture-root="true" className="flex flex-1 flex-col bg-white">
          <ProfileHeader
            profile={profile}
            activeTab={activeTab}
            isEditing={isEditing}
            onTabChange={setActiveTab}
            onFieldChange={updateProfileField}
            onPhotoChange={(url) => update("profilePhoto", url)}
          />

          <RatingHero
            tabData={currentTab}
            isEditing={isEditing}
            onRatingChange={updateCurrentTab}
            onReliabilityChange={updateCurrentReliability}
          />

          <PerformanceGrid
            performance={currentTab.performance}
            isEditing={isEditing}
            onChange={updatePerformanceField}
          />

          <MatchesCard
            match={currentTab.match}
            isEditing={isEditing}
            onChange={updateMatchField}
          />

          <div className="sticky bottom-0 z-10 border-t border-[#e6e8f0] bg-white px-2 py-2 shadow-[0_-1px_0_rgba(17,24,39,0.02)]">
            <div className="flex items-end justify-between gap-1">
              <NavItem
                icon={<ForecastIcon />}
                label="Forecast"
              />
              <NavItem icon={<PlayersIcon />} label="Players" />
              <NavItem icon={<ClubsIcon />} label="Clubs" />
              <NavItem icon={<ShopIcon />} label="Shop" />
              <NavItem icon={<EventsIcon />} label="Events" />
              <NavItem
                icon={
                  profile.profilePhoto ? (
                    <img
                      src={profile.profilePhoto}
                      alt="avatar"
                      className="h-6 w-6 rounded-full border border-white/70 object-cover"
                    />
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/30">
                      <UserIcon />
                    </div>
                  )
                }
                label="My DUPR"
                active
              />
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[390px] gap-3 border-t border-[#e6e8f0] bg-white px-5 py-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex-1 rounded-full py-3 text-sm font-semibold ${
              isEditing
                ? "bg-[#1f1f1f] text-white"
                : "border border-[#e2e4ea] bg-[#f1f2f6] text-[#1f1f1f]"
            }`}
          >
            {isEditing ? "Done Editing" : "Edit Profile"}
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 rounded-full bg-[#4b76d9] py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save as Photo"}
          </button>
        </div>
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
      className={`flex flex-col items-center gap-1 text-[10px] ${
        active ? "text-[#4b76d9]" : "text-[#9197a6]"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center ${
          active ? "rounded-2xl bg-[#f3f5fb]" : ""
        }`}
      >
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </div>
  );
}

function ForecastIcon() {
  return <IconStroke path="M4 17l5-5 4 3 6-8" />;
}

function PlayersIcon() {
  return <IconStroke path="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM19 8v6M22 11h-6" />;
}

function ClubsIcon() {
  return <IconStroke path="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M13 3.13a4 4 0 0 1 0 7.75M23 21v-2a4 4 0 0 0-3-3.87" />;
}

function ShopIcon() {
  return <IconStroke path="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />;
}

function EventsIcon() {
  return <IconStroke path="M8 21h8M12 17v4M7 4h10v8a5 5 0 0 1-10 0V4zM7 8H4a2 2 0 0 0 0 4h3M17 8h3a2 2 0 0 1 0 4h-3" />;
}

function UserIcon() {
  return <IconStroke path="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />;
}

function IconStroke({ path }: { path: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}
