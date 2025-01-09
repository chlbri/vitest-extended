import type { Undefiny } from '@bemedev/types';

export const isDefined = <T>(value?: Undefiny<T>): value is T => {
  return value !== undefined && value !== null;
};
