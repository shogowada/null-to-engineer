export interface EventuallyOptions {
  timeout: number;
  interval: number;
}

export const eventually = async <T>(
  action: () => PromiseLike<T>,
  options: EventuallyOptions,
  started: number = Date.now()
): Promise<T> => {
  return action().then(undefined, (error: any): PromiseLike<T> => {
    const elapsed = Date.now() - started;
    if (elapsed < options.timeout) {
      return new Promise<T>((resolve, reject) => {
        setTimeout(() => {
          eventually(action, options, started).then(resolve, reject);
        }, options.interval);
      });
    } else {
      return Promise.reject(error);
    }
  });
};
