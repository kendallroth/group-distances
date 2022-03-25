/** Coordinate validation regex */
const COORDINATE_REGEX = /^-?\d{1,3}(?:\.\d{1,6})?$/;

/**
 * Validate coordinate string
 *
 * @param   input - Input coordinate string
 * @returns Whether coordinate string is valid
 */
const validateCoordinate = (input: string): boolean => {
  if (!input) return false;

  return COORDINATE_REGEX.test(input);
};

export { COORDINATE_REGEX, validateCoordinate };
