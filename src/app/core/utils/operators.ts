import { Observable, map } from "rxjs";

const getRandomNumber = (multiplier: number = 100): number => Math.floor(Math.random() * multiplier);

export function takeRandom<T>(): (source$: Observable<T>) => Observable<T> {
  return source$ => source$.pipe(map((res: T) => (
    Array.isArray(res) ? res[getRandomNumber()] : res
  )))
}
