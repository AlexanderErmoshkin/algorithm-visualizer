import { AlgorithmTypes } from "@/stores";
import { describe, it, expect } from "vitest";
import BubbleSort from "../bubble-sort";

const data = [
  {
    array: [10, 2, 5, 16, 1],
    expected: [1, 2, 5, 10, 16],
  },
  {
    array: [1, 2, 3, 4, 5],
    expected: [1, 2, 3, 4, 5],
  },
  {
    array: [8],
    expected: [8],
  },
  {
    array: [],
    expected: [],
  },
  {
    array: [15, 23, 8, 16, 42, 4],
    expected: [4, 8, 15, 16, 23, 42],
  },
];

describe.each(data)("Bubble Sort", (data) => {
  it("sorts arrays", () => {
    const array = [...data.array];
    new BubbleSort().sort(array);
    expect(array).toEqual(data.expected);
  });

  it("has own id", () => {
    const sort = new BubbleSort();
    expect(sort.is(AlgorithmTypes.Bubble)).toBeTruthy();
  });
});
