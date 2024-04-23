import {
  createTests as _createTests,
  useEach as _useEach,
  useEachAsync as _useEachAsync,
  useTFA as _useTFA,
} from '@bemedev/test-extended';
import { partialCall } from '@bemedev/test-extended/lib/partialCall';
import { Fc, TestLibrary } from '@bemedev/test-extended/lib/types';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from 'vitest';

export type {
  Fc,
  TestArgs,
  TestLibrary,
  TestReturn,
} from '@bemedev/test-extended/lib/types';

// #region Refunction
// #region SubType
type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

type AllowedNames<Base, Condition> = FilterFlags<
  Base,
  Condition
>[keyof Base];
export type SubType<Base extends object, Condition> = Pick<
  Base,
  AllowedNames<Base, Condition>
>;
// #endregion

type KeysFn<T extends object = object> = keyof SubType<T, Fc>;

function _reFunction<P extends any[] = any[], R = any>(
  fn: Fc<P, R>,
  bind: any,
) {
  return (...args: P) => fn.bind(bind)(...args) as R;
}

export function reFunction<
  T extends object = object,
  FnKey extends KeysFn<T> = KeysFn<T>,
>(object: T, fn: FnKey) {
  const _fn = object[fn];
  type Pm = T[FnKey] extends (...args: infer P) => any ? P : any[];
  type Re = T[FnKey] extends (...args: any) => infer R ? R : any;
  return _reFunction<Pm, Re>(_fn as any, object);
}
// #endregion

export const VITEST: TestLibrary = {
  each: reFunction(test.concurrent, 'each'),
  test: test,
  afterAll: afterAll,
  beforeAll: beforeAll,
  afterEach: afterEach,
  beforeEach: beforeEach,
  describe: describe,
  expect: expect,
};

export const useTestFunctionAcceptation = partialCall(_useTFA, VITEST);
export const useTFA = useTestFunctionAcceptation;

export const useEachAsync = <F extends Fc<any, Promise<any>>>(f: F) => {
  return _useEachAsync(VITEST, f);
};
export const useEach = <F extends Fc>(f: F) => {
  return _useEach(VITEST, f);
};

export const createTests = <F extends Fc>(f: F) => {
  return _createTests(VITEST, f);
};
