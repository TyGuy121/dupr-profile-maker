import { ProfileData } from "./types";

export const defaultProfile: ProfileData = {
  name: "Ty Root",
  location: "Travis County, TX, US",
  gender: "Male",
  following: 3,
  followers: 7,
  playerId: "R7NX3P",
  profilePhoto: "",
  doublesRating: "3.032",
  doublesReliability: 90,
  singlesRating: "2.684",
  singlesReliability: 61,
  doubles: {
    rating: "3.032",
    reliability: 90,
    careerHigh: "3.362",
    performance: {
      mixedRating: "NR",
      record: "15-15",
      avgPartner: "3.150",
      avgOpponent: "3.230",
      avgPointsWon: "49.19%",
    },
    match: {
      adjustment: "+0.100",
      ratingStart: "2.932",
      ratingEnd: "3.032",
      date: "June 1, 2026",
    },
  },
  singles: {
    rating: "2.684",
    reliability: 61,
    careerHigh: "2.910",
    performance: {
      mixedRating: "NR",
      record: "8-6",
      avgPartner: "2.740",
      avgOpponent: "2.810",
      avgPointsWon: "52.04%",
    },
    match: {
      adjustment: "+0.042",
      ratingStart: "2.642",
      ratingEnd: "2.684",
      date: "May 24, 2026",
    },
  },
};
