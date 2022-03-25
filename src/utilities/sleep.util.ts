/**
 * Sleep for a specified amount of time (milliseconds)
 * @param   ms - Length of delay/timeout
 */
const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export { sleep };
