import { ProfileData } from "./types";

export const defaultProfile: ProfileData = {
  name: "Jane Doe",
  location: "United States",
  gender: "Female",
  following: 0,
  followers: 0,
  playerId: "XXXXXX",
  profilePhoto: "",
  doublesRating: "0.000",
  doublesReliability: 0,
  singlesRating: "0.000",
  singlesReliability: 0,
  doubles: {
    rating: "0.000",
    reliability: 0,
    careerHigh: "0.000",
    performance: {
      mixedRating: "NR",
      record: "0-0",
      avgPartner: "0.000",
      avgOpponent: "0.000",
      avgPointsWon: "0.00%",
    },
    match: {
      adjustment: "+0.000",
      ratingStart: "0.000",
      ratingEnd: "0.000",
      date: "TBD",
    },
  },
  singles: {
    rating: "0.000",
    reliability: 0,
    careerHigh: "0.000",
    performance: {
      mixedRating: "NR",
      record: "0-0",
      avgPartner: "0.000",
      avgOpponent: "0.000",
      avgPointsWon: "0.00%",
    },
    match: {
      adjustment: "+0.000",
      ratingStart: "0.000",
      ratingEnd: "0.000",
      date: "TBD",
    },
  },
};
