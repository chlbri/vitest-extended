import { expect, test, type TestOptions } from 'vitest';
import { sleep } from './sleep';
import type { TestDoneFunction } from './types';

export const useDone = (ms = 0) => {
  let executed = false;
  const done = () => (executed = true);

  const testDone = async () => {
    await sleep(ms);
    expect(executed).toBe(true);
  };

  return { done, testDone };
};

// #region Preparation
/* v8 ignore next 18 */
const objectify = (
  options?: TestOptions | number,
): [TestOptions, number] => {
  const _timeout = getTimeout(options);
  const timeout = _timeout + 10;

  let _options = { timeout };
  if (!(typeof options === 'number')) {
    _options = { ...options, timeout };
  }

  return [_options, _timeout];
};

const getTimeout = (options?: TestOptions | number) => {
  if (options === undefined) return 10;
  if (typeof options === 'number') return options;
  return options?.timeout ?? 10;
};
// #endregion

/**
 * Build a test with a done function with a timeout
 * @param invite The description of the test
 * @param fn Where you can test, Don't async this function
 * @param options Options for the test like TestAPI from vitest
 * @returns a vitest test
 */
export const doneTest = (
  invite: string,
  fn: TestDoneFunction,
  options: number | TestOptions = 0,
) => {
  const [_options, ms] = objectify(options);

  return test(invite, _options, () => {
    const { done, testDone } = useDone(ms);
    fn(done);
    return testDone();
  });
};

/**
 * Build a test that fails with a done function with a timeout
 * @param invite The description of the test
 * @param fn Where you can test, Don't async this function
 * @param options Options for the test like TestAPI from vitest
 * @returns a vitest test
 */
doneTest.fails = (
  invite: string,
  fn: TestDoneFunction,
  options: number | TestOptions = 0,
) => {
  const [_options, ms] = objectify(options);

  return test.fails(invite, _options, () => {
    const { done, testDone } = useDone(ms);
    fn(done);
    return testDone();
  });
};

/**
 * Build a concurrent test with a done function with a timeout
 * @param invite The description of the test
 * @param fn Where you can test, Don't async this function
 * @param options Options for the test like TestAPI from vitest
 * @returns a vitest test
 */
doneTest.concurrent = (
  invite: string,
  fn: TestDoneFunction,
  options: number | TestOptions = 0,
) => {
  const [_options, ms] = objectify(options);

  return test.concurrent(invite, _options, () => {
    const { done, testDone } = useDone(ms);
    fn(done);
    return testDone();
  });
};
