import { sort } from "fast-sort";

// Utilities
import { calculateHaversine } from "./haversine.util";

// Types
import type {
  IComparisonItemInput,
  ICoordinate,
  IDestinationStats,
} from "@typings/comparison.types";

/**
 * Calculate location/destination comparison stats
 *
 * @param   locations    - List of starting locations
 * @param   destinations - List of destinations
 * @returns Location/destination comparison stats
 */
const calculateStats = (
  locations: IComparisonItemInput[],
  destinations: IComparisonItemInput[],
): IDestinationStats[] => {
  const stats: IDestinationStats[] = [];

  destinations.forEach((destination) => {
    const end = parseCoordinatesFromInput(destination);

    const destinationStats: IDestinationStats = {
      average: 0,
      destination: destination.label,
      locations: 0,
      max: { distance: 0, location: "" },
      min: { distance: 0, location: "" },
      total: 0,
    };

    locations.forEach((location) => {
      const start = parseCoordinatesFromInput(location);
      const distance = calculateHaversine(start, end);

      destinationStats.locations++;
      destinationStats.total += distance;
      if (distance > destinationStats.max.distance) {
        destinationStats.max = { distance, location: location.label };
      }
      if (distance < destinationStats.min.distance || destinationStats.min.distance === 0) {
        destinationStats.min = { distance, location: location.label };
      }
    });

    destinationStats.average = destinationStats.total / destinationStats.locations;
    stats.push(destinationStats);
  });

  return sort(stats).asc((s) => s.average);
};

/**
 * Parse numeric coordinates from form input
 *
 * @param   input - Form input
 * @returns Numeric lat/lng coordinates
 */
const parseCoordinatesFromInput = (input: IComparisonItemInput): ICoordinate => {
  return {
    latitude: parseFloat(input.latitude),
    longitude: parseFloat(input.longitude),
  };
};

export { calculateStats };
