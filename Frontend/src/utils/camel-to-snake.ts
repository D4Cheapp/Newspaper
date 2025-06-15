export const camelToSnake = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((item: unknown) => camelToSnake(item));
  } else if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, value]: [string, unknown]) => [
        key.replace(/([A-Z])/g, (c) => `_${c.toLowerCase()}`),
        camelToSnake(value),
      ])
    );
  } else {
    return value;
  }
};
