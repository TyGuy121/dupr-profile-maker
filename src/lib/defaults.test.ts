import { describe, expect, it } from "vitest";
import { defaultProfile } from "@/lib/defaults";

describe("defaultProfile", () => {
  it("provides the expected nested doubles and singles profile data", () => {
    expect(defaultProfile).toMatchObject({
      name: "Jane Doe",
      location: "United States",
      gender: "Female",
      followers: 0,
      profilePhoto: "",
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
    });

    expect(defaultProfile.doubles).not.toBe(defaultProfile.singles);
  });

  it("keeps legacy flat fields available while the component still consumes them", () => {
    expect(defaultProfile.following).toBe(0);
    expect(defaultProfile.playerId).toBe("XXXXXX");
    expect(defaultProfile.doublesRating).toBe(defaultProfile.doubles.rating);
    expect(defaultProfile.doublesReliability).toBe(defaultProfile.doubles.reliability);
    expect(defaultProfile.singlesRating).toBe(defaultProfile.singles.rating);
    expect(defaultProfile.singlesReliability).toBe(defaultProfile.singles.reliability);
  });
});
