import { getRandomInt } from "./getRandomNumber";

export function pickRandomFromArray<T>(array: T[], count: number) {
  let result: T[] = [];
  let counter = 0;
  let arrayLength = array.length > count ? count : array.length;

  while (counter < arrayLength) {
    let randomIndex = getRandomInt(array.length);

    if (!result.includes(array[randomIndex])) {
      result.push(array[randomIndex]);
      counter++;
    }
  }
  return result ?? [];
}
