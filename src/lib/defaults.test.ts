import { describe, expect, it } from "vitest";
import { defaultProfile } from "@/lib/defaults";

describe("defaultProfile", () => {
  it("provides shared profile fields and independent doubles/singles datasets", () => {
    expect(defaultProfile.name).toBeTruthy();
    expect(defaultProfile.followers).toBeTypeOf("number");
    expect(defaultProfile.doubles.rating).toBeTruthy();
    expect(defaultProfile.singles.rating).toBeTruthy();
    expect(defaultProfile.doubles.performance.avgPointsWon).toMatch(/%$/);
    expect(defaultProfile.singles.match.date).toBeTruthy();
    expect(defaultProfile.doubles).not.toBe(defaultProfile.singles);
  });
});
