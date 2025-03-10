import { use } from "react";

interface useQueryProps<T> {
  cache: Map<string, Promise<T>>;
  key: string;
  promise: Promise<T>;
}

export const useQuery = <T>({ cache, key, promise }: useQueryProps<T>) => {
  if (!cache.has(key)) {
    if (cache.size > 0) {
      cache.clear();
    }

    cache.set(key, promise);
  }

  const cachedPromise = cache.get(key);

  if (!cachedPromise) {
    return;
  }

  return use(cachedPromise);
}