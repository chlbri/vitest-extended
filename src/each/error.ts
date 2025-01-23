import { expect, test } from 'vitest';
import { partialCall } from '../partialCall';
import { toArrayVitest } from '../toArray';
import type {
  UseErrorAsyncEach_F,
  UseErrorAsyncEachCases_F,
  UseErrorEach_F,
  UseErrorEachCases_F,
} from './error.types';

export const useErrorEachCases: UseErrorEachCases_F = (
  f,
  toError = () => undefined,
  ...cases
) => {
  test.concurrent.each(toArrayVitest.error(cases))(
    '%s',
    (_, args) => {
      const actual = () => f(...args);
      const error = toError(...args);

      expect(actual).toThrowError(error);
    },
    50,
  );
};

export const useErrorEach: UseErrorEach_F = (f, toError, ...cases) => {
  const forward = cases.length >= 1;

  if (forward) return useErrorEachCases(f, toError, ...cases);
  return partialCall(useErrorEachCases<typeof f>, f, toError) as any;
};

export const useErrorAsyncEachCases: UseErrorAsyncEachCases_F = (
  f,
  toError = () => undefined,
  ...cases
) => {
  test.concurrent.each(toArrayVitest.error(cases))(
    '%s',
    async (_, args) => {
      const actual = () => f(...args);

      await expect(actual).rejects.toThrowError(toError(...args));
    },
    1000,
  );
};

export const useErrorAsyncEach: UseErrorAsyncEach_F = (
  f,
  toError,
  ...cases
) => {
  const forward = cases.length >= 1;

  if (forward) return useErrorAsyncEachCases(f, toError, ...cases);
  return partialCall(useErrorAsyncEachCases<typeof f>, f, toError) as any;
};
