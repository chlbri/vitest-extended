import type { Fn } from '@bemedev/types';
import { expect, test } from 'vitest';
import { partialCall } from './partialCall';
import { toArray2 } from './toArray';
import type { TestArgs, TestReturn } from './types';

// #region Sync
// #region Config
export function useEachCases<F extends Fn>(f: F, ...cases: TestArgs<F>) {
  test.concurrent.each(toArray2(cases))(
    '%s',
    (_, args, expected) => {
      const value = f(...args);
      const checkArray = Array.isArray(value) && Array.isArray(expected);
      if (checkArray) {
        return expect(value.sort()).toStrictEqual(expected.sort());
      }
      return expect(value).toStrictEqual(expected);
    },
    50,
  );
}

function useEachFunction<F extends Fn>(f: F) {
  const out = partialCall(useEachCases<F>, f);
  return out;
}
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
 * @param f The function to test
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
export function useEach<F extends Fn, A extends TestArgs<F> = []>(
  f: F,
  ...cases: A
) {
  type Re = TestReturn<F, A>;

  const forward = cases.length >= 1;
  if (forward) {
    return useEachCases(f, ...cases) as Re;
  }
  return useEachFunction(f) as Re;
}
// #endregion

// #region Async
// #region Config
function useEachAsyncCases<F extends Fn<any, Promise<any>>>(
  f: F,
  ...cases: TestArgs<F>
) {
  test.concurrent.each(toArray2(cases))(
    '%s',
    async (_, args, expected) => {
      const value = await f(...args);
      const checkArray = Array.isArray(value) && Array.isArray(expected);
      if (checkArray) {
        return expect(value.sort()).toStrictEqual(expected.sort());
      }
      return expect(value).toStrictEqual(expected);
    },
    1000,
  );
}

function useEachAsyncFunction<F extends Fn<any, Promise<any>>>(f: F) {
  const out = partialCall(useEachAsyncCases<F>, f);
  return out;
}
// #endregion

/**
 * Same as ***useEach***
 *
 * But for async functions
 *
 *  */
export function useEachAsync<
  F extends Fn<any, Promise<any>>,
  A extends TestArgs<F>,
>(f: F, ...cases: A) {
  type Re = TestReturn<F, A>;

  const forward = cases.length >= 1;
  if (forward) {
    return useEachAsyncCases(f, ...cases) as Re;
  }

  return useEachAsyncFunction(f) as Re;
}
// #endregion
