import type { NumberArray } from "../stores";

export default abstract class AbstractAlgorithm<T> {
  id!: number;
  name!: string;

  is(id: number) {
    return this.id === id;
  }

  abstract sort(array: NumberArray): T[];
}
