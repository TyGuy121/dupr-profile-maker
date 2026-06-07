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
  following: number;
  followers: number;
  playerId: string;
  profilePhoto: string;
  doublesRating: string;
  doublesReliability: number;
  singlesRating: string;
  singlesReliability: number;
  doubles: TabProfileData;
  singles: TabProfileData;
}
