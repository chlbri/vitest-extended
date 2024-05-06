import { expect, test } from 'vitest';
import { partialCall } from './partialCall';
import type { Fc, TestArgs, TestReturn } from './types';

// #region Sync
// #region Config
function useEachCases<F extends Fc>(f: F, ...cases: TestArgs<F>) {
  test.concurrent.each(cases)(
    '%s',
    (_, args, expected) => {
      const value = f(...args);
      expect(value).toEqual(expected);
    },
    50,
  );
}

function useEachFunction<F extends Fc>(f: F) {
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
export function useEach<F extends Fc, A extends TestArgs<F> = []>(
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
function useEachAsyncCases<F extends Fc<any, Promise<any>>>(
  f: F,
  ...cases: TestArgs<F>
) {
  test.concurrent.each(cases)(
    '%s',
    async (_, args, expected) => {
      const value = await f(...args);
      expect(value).toEqual(expected);
    },
    1000,
  );
}

function useEachAsyncFunction<F extends Fc<any, Promise<any>>>(f: F) {
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
  F extends Fc<any, Promise<any>>,
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
