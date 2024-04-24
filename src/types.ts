export type Fc<Arg extends any[] = any[], Re = any> = (...args: Arg) => Re;

type Test = Fc<[inivte: string, f: Fc, number?], void>;

/**
 * Jest or Vitest
 */
export type TestLibrary = {
  each: Fc<[any], Test>;
  test: Test;
  afterAll: Fc<[Fc, number?]>;
  beforeAll: Fc<[Fc, number?]>;
  beforeEach: Fc<[Fc, number?]>;
  afterEach: Fc<[Fc, number?]>;
  describe: Test;
  expect: Fc<
    any,
    {
      toEqual: Fc<[any], void>;
      toBeDefined: Fc<[], void>;
      toBe: Fc<[any], void>;
    }
  >;
  timeout?: number;
};

export type TestArgs<F extends Fc> = [
  invite: string,
  parameters: Parameters<F>,
  expected: Awaited<ReturnType<F>>,
][];

export type TestReturn<
  F extends Fc,
  A extends TestArgs<F>,
> = A['length'] extends 0 ? (...tailArgs: TestArgs<F>) => void : void;
