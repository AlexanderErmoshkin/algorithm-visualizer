/**
 * creates an array of random length from "minLength" to "maxLength"
 * with random numeric values, where each value is less than "maxValue"
 */
export const randomNumbers = (
  minLength: number,
  maxLength: number,
  maxValue: number
) =>
  new Array(Math.floor(Math.random() * (maxLength - minLength + 1) + minLength))
    .fill(undefined)
    .map(() => Math.ceil(Math.random() * maxValue));

/**
 * swaps two elements in array
 */
export const swap = (array: number[], index1: number, index2: number) => {
  const tmp = array[index1];
  array[index1] = array[index2];
  array[index2] = tmp;
};
