import { use } from "react";

interface useQueryProps<T> {
  key: string;
  promise: Promise<T>;
}

const claimsPromiseCache = new Map<string, Promise<unknown>>();

export const useQuery = <T>({ key, promise }: useQueryProps<T>) => {
  if (!claimsPromiseCache.has(key)) {
    if (claimsPromiseCache.size > 0) {
      claimsPromiseCache.clear();
    }

    claimsPromiseCache.set(key, promise);
  }

  const cachedPromise = claimsPromiseCache.get(key);

  if (!cachedPromise) {
    return;
  }

  return use(cachedPromise);
}