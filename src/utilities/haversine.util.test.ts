import { describe, expect, it } from "vitest";

// Utilities
import { calculateHaversine } from "./haversine.util";

// Types
import type { ICoordinate } from "@typings/comparison.types";

describe("Haversine equation", () => {
  it("Calculates large distance correctly", () => {
    const start: ICoordinate = { latitude: 49.299349, longitude: -123.135734 };
    const end: ICoordinate = { latitude: 44.647593, longitude: -63.577413 };

    const output = calculateHaversine(start, end);

    const expected = 4430.0900326772;
    expect(output).toStrictEqual(expected);
  });

  it.todo("Calculate with different formats");
});
