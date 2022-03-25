// Types
import type { ICoordinate } from "@typings/comparison.types";

type Radii = "km" | "m" | "mi";

const RadiiMap: Record<Radii, number> = {
  m: 6371000,
  mi: 3960,
  km: 6371,
};

/**
 * Convert degrees to radians
 *
 * @param   degrees - Input degrees
 * @returns Converted radians
 */
const toRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

/**
 * Calculate angular distance between two coordinates on a sphere
 *
 * Source: https://github.com/njj/haversine
 *
 * @param   start - Starting point
 * @param   end   - Ending point
 * @param   unit  - Unit to use in distance calculation
 * @returns Angular distance between points
 */
const calculateHaversine = (start: ICoordinate, end: ICoordinate, unit: Radii = "km"): number => {
  const latDelta = toRadians(end.latitude - start.latitude);
  const lngDelta = toRadians(end.longitude - start.longitude);
  const latStart = toRadians(start.latitude);
  const latEnd = toRadians(end.latitude);

  const angle =
    Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
    Math.sin(lngDelta / 2) * Math.sin(lngDelta / 2) * Math.cos(latStart) * Math.cos(latEnd);
  const distance = 2 * Math.atan2(Math.sqrt(angle), Math.sqrt(1 - angle));

  return distance * RadiiMap[unit];
};

export { calculateHaversine, toRadians };
