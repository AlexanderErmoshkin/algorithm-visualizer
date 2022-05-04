import { defineStore } from "pinia";
import type AbstractAlgorithm from "@/algorithms/abstract-algorithm";
import { swap, randomNumbers } from "@/helpers/arrays";
import BubbleSort from "@/algorithms/bubble-sort";

export type NumberArray = number[];

export interface Step {
  changes?: [number, number];
  highlighted?: NumberArray;
  lastUnsortedIndex?: number;
  log: string;
}

interface State<T = Step> {
  chosenAlgorithm: AbstractAlgorithm<T> | null;
  options: AbstractAlgorithm<T>[];
  values: NumberArray;
  steps: T[];
  position: number;
  speed: number;
  isPlaying: boolean;
  isMobileMenuOpened: boolean;
}

export enum AlgorithmTypes {
  Bubble = 1,
}

const MIN_ARRAY_LENGTH = 5;
const MAX_ARRAY_LENGTH = 15;
const MAX_ELEMENT_VALUE = 50;

export const useStore = defineStore({
  id: "algorithm",
  state: () =>
    ({
      chosenAlgorithm: null,
      options: [new BubbleSort()],
      values: [],
      steps: [],
      position: 0,
      speed: 1000,
      isPlaying: false,
      isMobileMenuOpened: false,
    } as State),
  getters: {
    isChosen: (state) => (id: number) =>
      state.chosenAlgorithm && state.chosenAlgorithm.is(id),
    maxValue: (state) => Math.max(...state.values),
    currentStep: (state) => state.steps[state.position],
    logs: (state) => {
      const logs = [];
      for (let i = 1; i <= state.position; i++) {
        logs.push(state.steps[i].log);
      }
      return logs;
    },
  },
  actions: {
    setChosenAlgorithm(id: number) {
      if (this.chosenAlgorithm && this.chosenAlgorithm.id === id) return;
      this.isMobileMenuOpened = false;
      this.chosenAlgorithm =
        this.options.find((type) => type.id === id) || null;
      this.generateRandomArray();
      this.position = 0;
      this.isPlaying = false;
    },
    unsetChosenAlgorithm() {
      this.chosenAlgorithm = null;
      this.values = [];
      this.steps = [];
      this.position = 0;
      this.isPlaying = false;
    },
    generateRandomArray() {
      this.position = 0;
      this.isPlaying = false;
      this.values = randomNumbers(
        MIN_ARRAY_LENGTH,
        MAX_ARRAY_LENGTH,
        MAX_ELEMENT_VALUE
      );
      this.buildAlgorithmSteps();
    },
    buildAlgorithmSteps() {
      if (this.chosenAlgorithm) {
        const steps = this.chosenAlgorithm.sort([...this.values]);
        steps.unshift({ log: "" });
        this.steps = steps;
      }
    },
    incrementPosition() {
      if (this.position < this.steps.length - 1) {
        this.moveToPosition(this.position + 1);
      } else {
        this.pause();
      }
    },
    decrementPosition() {
      this.position && this.moveToPosition(this.position - 1);
    },
    moveToPosition(position: number) {
      if (position === this.position) return;

      if (position > this.position) {
        /**
         * if we are moving forward, the final array state is calculated
         * from changes of steps beginning with the next position
         * and finishing at the new position
         */
        for (let i = this.position + 1; i <= position; i++) {
          this.swapValues(i);
        }
      } else {
        /**
         * if we are moving backwards, we start with the changes of the current position
         * and continue to the position, presceding the destination
         */
        for (let i = this.position; i > position; i--) {
          this.swapValues(i);
        }
      }

      this.position = position;
    },
    swapValues(position: number) {
      if (this.steps[position].changes) {
        swap(
          this.values,
          this.steps[position].changes![0],
          this.steps[position].changes![1]
        );
      }
    },
    executeAlgorithm() {
      this.moveToPosition(0);
      this.play();
    },
    play() {
      this.isPlaying = true;
    },
    pause() {
      this.isPlaying = false;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpened = !this.isMobileMenuOpened;
    },
  },
});
