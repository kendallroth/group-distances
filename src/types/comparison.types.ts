export interface ICoordinate {
  /** Latitude */
  latitude: number;
  /** Longitude */
  longitude: number;
}

/** Coordinate represented as strings (for text inputs) */
export interface ICoordinateInput {
  /** Latitude */
  latitude: string;
  /** Longitude */
  longitude: string;
}

/** Comparison form input */
export interface IComparisonForm {
  destinations: IComparisonItemInput[];
  locations: IComparisonItemInput[];
}

export interface IComparisonItemBase {
  id: string;
  /** Whether comparison item is enabled */
  enabled: boolean;
  /** Comparison item name/label */
  label: string;
}

/** Distance comparison stats for a destination */
export interface IDestinationStats {
  /** Average distance from locations */
  average: number;
  /** Destination name */
  destination: string;
  /** Number of locations considered */
  locations: number;
  /** Maximum distance from a location */
  max: {
    location: string;
    distance: number;
  };
  /** Minimum distance from a location */
  min: {
    location: string;
    distance: number;
  };
  /** Total distance from all locations */
  total: number;
}

export interface IComparisonItem extends IComparisonItemBase, ICoordinate {}
export interface IComparisonItemInput extends IComparisonItemBase, ICoordinateInput {}
