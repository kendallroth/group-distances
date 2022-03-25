import { v4 as uuid } from "uuid";

// Types
import type { IComparisonForm, IComparisonItemInput } from "@typings/comparison.types";

const SAVED_LOCATIONS_KEY = "savedLocations";

/**
 * Load stored comparison form data
 *
 * @param   saveKey - Save key
 * @throws  Any error related to invalid parsing, etc
 * @returns Comparison form data
 */
const loadPlace = (saveKey: string): IComparisonForm | null => {
  const locations = loadPlaces();

  return locations[saveKey] ?? null;
};

/**
 * Load all stored comparison form data
 *
 * @throws  Any error related to invalid parsing, etc
 * @returns All stored comparisons (in form input shape)
 */
const loadPlaces = (): Record<string, IComparisonForm> => {
  const savedLocationsRaw = localStorage.getItem(SAVED_LOCATIONS_KEY);
  if (!savedLocationsRaw) return {};

  const savedLocations = JSON.parse(savedLocationsRaw);

  const parsedLocations: Record<string, IComparisonForm> = {};
  Object.entries(savedLocations).forEach(([saveKey, value]) => {
    if (!value) return;

    const { destinations, locations } = value as any;
    if (!destinations || !locations) return;

    parsedLocations[saveKey] = {
      destinations: destinations ? destinations.map(parseLoadedPlace) : [],
      locations: locations ? locations.map(parseLoadedPlace) : [],
    };
  });

  return parsedLocations;
};

/**
 * Parse a loaded location string
 *
 * @param   location - Location string
 * @returns Parsed location data
 */
const parseLoadedPlace = (location: Record<string, string>): IComparisonItemInput => {
  return {
    enabled: [true, "true"].includes(location.enabled) ?? false,
    id: location.id ?? uuid(),
    label: location.label ?? "",
    latitude: location.latitude ?? "",
    longitude: location.longitude ?? "",
  };
};

/**
 * Store comparison form data
 *
 * @param   saveKey  - Save key
 * @param   location - Comparison form data
 * @throws  Any error related to invalid parsing, etc
 */
const storePlace = (saveKey: string, location: IComparisonForm) => {
  const locations = loadPlaces();

  const locationsString = JSON.stringify({
    ...locations,
    [saveKey]: location,
  });

  localStorage.setItem(SAVED_LOCATIONS_KEY, locationsString);
};

export { loadPlace, storePlace };
