import { describe, expect, it } from "vitest";
import { defaultProfile } from "@/lib/defaults";

describe("defaultProfile", () => {
  it("provides the expected nested doubles and singles profile data", () => {
    expect(defaultProfile).toMatchObject({
      name: "Ty Root",
      location: "Travis County, TX, US",
      gender: "Male",
      followers: 7,
      profilePhoto: "",
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
    });

    expect(defaultProfile.doubles).not.toBe(defaultProfile.singles);
  });

  it("keeps legacy flat fields available while the component still consumes them", () => {
    expect(defaultProfile.following).toBe(3);
    expect(defaultProfile.playerId).toBe("R7NX3P");
    expect(defaultProfile.doublesRating).toBe(defaultProfile.doubles.rating);
    expect(defaultProfile.doublesReliability).toBe(defaultProfile.doubles.reliability);
    expect(defaultProfile.singlesRating).toBe(defaultProfile.singles.rating);
    expect(defaultProfile.singlesReliability).toBe(defaultProfile.singles.reliability);
  });
});
