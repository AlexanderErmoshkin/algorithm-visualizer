import type { NumberArray, Step } from "../stores";
import { AlgorithmTypes } from "../stores";
import AbstractAlgorithm from "./abstract-algorithm";
import { swap } from "@/helpers/arrays";

export default class BubbleSort extends AbstractAlgorithm<Step> {
  id = AlgorithmTypes.Bubble;
  name = "Bubble Sort";

  sort(array: NumberArray): Step[] {
    const steps = [];
    let lastUnsortedIndex = array.length - 1;
    let comparingItems, swapped;

    for (let i = 0; i < array.length - 1; i++) {
      swapped = false;
      for (let j = 0; j < array.length - i - 1; j++) {
        comparingItems = [j, j + 1];
        steps.push({
          log: `Comparing ${array[j]} and ${array[j + 1]}.`,
          lastUnsortedIndex: lastUnsortedIndex,
          highlighted: comparingItems,
        });

        if (array[j] > array[j + 1]) {
          swap(array, j + 1, j);
          swapped = true;

          steps.push({
            changes: comparingItems,
            highlighted: comparingItems,
            lastUnsortedIndex: lastUnsortedIndex,
            log: `Swapping ${array[j]} and ${array[j + 1]}.`,
          });
        }
      }

      lastUnsortedIndex--;
      steps.push({
        lastUnsortedIndex: lastUnsortedIndex,
        log: "Mark the element as sorted.",
      });

      if (!swapped) {
        break;
      }
    }

    steps.push({ log: "The array is sorted." });
    return steps as Step[];
  }
}
