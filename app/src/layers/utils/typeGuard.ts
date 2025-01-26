export const isValidType = <T>(keys: [keyof T], object: unknown): object is T => {
  if (typeof object !== "object" || object === null) {
    return false;
  }

  return keys.every(key => key in object);
}