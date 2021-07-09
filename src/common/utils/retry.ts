import { wait } from "./wait";

export const retry = <T>(
  action: (remainingCount: number) => PromiseLike<T>,
  count: number,
  delay: (() => number) | number = 1
): PromiseLike<T> => {
  const getDelay = (): number => {
    if (typeof delay === "function") {
      return delay();
    } else {
      return delay;
    }
  };

  return action(count).then(undefined, (error) => {
    const remainingCount: number = count - 1;
    if (remainingCount <= 0) {
      return Promise.reject(error);
    } else {
      return wait(getDelay()).then(() => retry(action, remainingCount));
    }
  });
};
