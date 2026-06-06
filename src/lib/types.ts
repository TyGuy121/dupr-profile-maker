export type ActiveTab = "doubles" | "singles";

export interface PerformanceStats {
  mixedRating: string;
  record: string;
  avgPartner: string;
  avgOpponent: string;
  avgPointsWon: string;
}

export interface MatchCardData {
  adjustment: string;
  ratingStart: string;
  ratingEnd: string;
  date: string;
}

export interface TabProfileData {
  rating: string;
  reliability: number;
  careerHigh: string;
  performance: PerformanceStats;
  match: MatchCardData;
}

export interface ProfileData {
  name: string;
  location: string;
  gender: string;
  followers: number;
  profilePhoto: string;
  doubles: TabProfileData;
  singles: TabProfileData;
}
