import { expect, test } from 'vitest';
import { identity } from '../identity';
import { toArrayVitest } from '../toArray';
import type {
  _UseAsyncEach_F,
  _UseEach_F,
  UseAsyncEach_F,
  UseEach_F,
} from './pass.types';

// #region Sync
// #region Config

const useEachCases: _UseEach_F = (
  func,
  transform = identity as any,
  ...cases
) => {
  test.concurrent.each(toArrayVitest(cases))('%s', (_, args, expected) => {
    const value = transform(func(...args));
    const checkArray = Array.isArray(value) && Array.isArray(expected);
    if (checkArray) {
      return expect(value.sort()).toStrictEqual(expected.sort());
    }
    return expect(value).toStrictEqual(expected);
  });
};

// #endregion

/**
 * A better version of **test.each**
 *
 * Type parameters
 *
 * @type A Parameters of the function, extends Array type
 * @type R ReturnType of the function
 *
 * @if R are not provided, the return is a function to test with TestArgs arguments
 *
 * @else It tests every cases provided
 *
 * @param func The function to test
 * @param cases The cases to test, The invite is the first arguments.
 * It's an array of Array.
 * * #1 The first arg is the invite of the test
 *
 * * #2 The second arg is the parameters to to pass to the function. It's an array (param array).
 *
 * * #3 The third arg is the expected result
 *
 * Example: For a function like ***(arg1: string)=>any***, the second arg with be : ***[string]***
 *  */
export const useEach: UseEach_F = (func, transform) => {
  return (...cases) => useEachCases(func, transform, ...cases);
};

// #endregion

// #region Async
// #region Config
const useEachAsyncCases: _UseAsyncEach_F = (
  f,
  transform = identity as any,
  ...cases
) => {
  test.concurrent.each(toArrayVitest(cases))(
    '%s',
    async (_, args, expected) => {
      const value = transform(await f(...args));
      const checkArray = Array.isArray(value) && Array.isArray(expected);
      if (checkArray) {
        return expect(value.sort()).toStrictEqual(expected.sort());
      }
      return expect(value).toStrictEqual(expected);
    },
  );
};

// #endregion

/**
 * Same as ***useEach***
 *
 * But for async functions
 *
 *  */
export const useEachAsync: UseAsyncEach_F = (func, transform) => {
  return (...cases) => useEachAsyncCases(func, transform, ...cases);
};
// #endregion
