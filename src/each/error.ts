import { expect, test } from 'vitest';
import { toArrayVitest } from '../toArray';
import type { _UseErrorEach_F, UseErrorEach_F } from './error.types';

export const useErrorAsyncEachCases: _UseErrorEach_F = (
  f,
  toError = () => undefined,
  ...cases
) => {
  test.concurrent.each(toArrayVitest.error(cases))(
    '%s',
    async (_, args, _error) => {
      const actual = async () => f(...args);
      const check = _error === undefined;
      const error = check ? toError(...args) : _error;

      await expect(actual).rejects.toThrowError(error);
    },
  );
};

export const useErrorAsyncEach: UseErrorEach_F = (f, toError) => {
  return (...cases) => useErrorAsyncEachCases(f, toError, ...cases);
};
