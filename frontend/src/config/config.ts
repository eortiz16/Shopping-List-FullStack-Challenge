const RANGE_START = 1;
const RANGE_END = 3;

/**
 * Generates an array of numbers from start to end, inclusive.
 *
 * @param {number} start - The starting number of the range.
 * @param {number} end - The ending number of the range.
 * @returns {number[]} The array containing the range of numbers.
 */
const generateRange = (start: number, end: number): number[] => {
  const range: number[] = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
};

export const quantityOptions: number[] = generateRange(RANGE_START, RANGE_END);
export const CHARACTER_LIMIT = 100;
