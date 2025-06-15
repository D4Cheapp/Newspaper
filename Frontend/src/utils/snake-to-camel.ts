import { snakeToCamel as convertSnakeToCamel } from 'utils/snake-to-camel';

export const snakeToCamel = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((item: unknown) => snakeToCamel(item));
  } else if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, value]: [string, unknown]) => [
        convertSnakeToCamel(key),
        snakeToCamel(value),
      ])
    );
  } else {
    return value;
  }
};
