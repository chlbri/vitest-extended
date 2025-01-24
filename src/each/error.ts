import { expect, test } from 'vitest';
import { toArrayVitest } from '../toArray';
import type {
  _UseErrorAsyncEach_F,
  _UseErrorEach_F,
  UseErrorAsyncEach_F,
  UseErrorEach_F,
} from './error.types';

export const useErrorEachCases: _UseErrorEach_F = (
  f,
  toError = () => undefined,
  ...cases
) => {
  test.concurrent.each(toArrayVitest.error(cases))(
    '%s',
    (_, args, _error) => {
      const actual = () => f(...args);
      const check = _error === undefined;
      const error = check ? toError(...args) : _error;

      expect(actual).toThrowError(error);
    },
  );
};

export const useErrorEach: UseErrorEach_F = (f, toError) => {
  return (...cases) => useErrorEachCases(f, toError, ...cases);
};

export const useErrorAsyncEachCases: _UseErrorAsyncEach_F = (
  f,
  toError = () => undefined,
  ...cases
) => {
  test.concurrent.each(toArrayVitest.error(cases))(
    '%s',
    async (_, args, _error) => {
      const actual = () => f(...args);
      const check = _error === undefined;
      const error = check ? toError(...args) : _error;

      await expect(actual).rejects.toThrowError(error);
    },
  );
};

export const useErrorAsyncEach: UseErrorAsyncEach_F = (f, toError) => {
  return (...cases) => useErrorAsyncEachCases(f, toError, ...cases);
};
