import type { Fn, LengthOf, NExtract } from '@bemedev/types';
import type * as vi from 'vitest';

type Test = Fn<[inivte: string, f: Parameters<Fn>, number?], void>;

/**
 * Jest or Vitest
 */
export type TestLibrary = {
  each: Fn<[any], Test>;
  test: Test;
  afterAll: Fn<[Fn, number?]>;
  beforeAll: Fn<[Fn, number?]>;
  beforeEach: Fn<[Fn, number?]>;
  afterEach: Fn<[Fn, number?]>;
  describe: Test;
  expect: Fn<
    any,
    {
      toEqual: Fn<[any], void>;
      toBeDefined: Fn<[], void>;
      toBe: Fn<[any], void>;
    }
  >;
  timeout?: number;
};

type SimpleParams<F extends Fn, P extends any[] = Parameters<F>> =
  LengthOf<P> extends 0
    ? { parameters?: never }
    : LengthOf<P> extends 1
      ? { parameters: P[0] | P }
      : 0 extends LengthOf<P>
        ? 1 extends LengthOf<P>
          ? { parameters?: P | P[0] }
          : { parameters?: P }
        : { parameters: P };

export type TestArgs<F extends Fn> = ({
  invite: string;
  expected: Awaited<ReturnType<F>>;
} & SimpleParams<F>)[];

export type TestArgs2<F extends Fn> = [
  invite: string,
  parameters: Parameters<F>,
  expected: Awaited<ReturnType<F>>,
][];

export type ToArray_F = <T>(obj: any) => T[];

export type ToArray2_F = <F extends Fn>(
  params: TestArgs<F>,
) => TestArgs2<F>;

export type TestReturn<
  F extends Fn,
  A extends TestArgs<F>,
> = A['length'] extends 0 ? (...tailArgs: TestArgs<F>) => void : void;

export type TestDoneFunction = (context: () => boolean) => void;

type Phs<
  T extends NExtract<
    keyof typeof vi,
    'beforeAll' | 'beforeEach' | 'afterAll' | 'afterEach'
  >,
> = Parameters<(typeof vi)[T]>;

export type CreateTestsOPtions = {
  beforeAll?: Phs<'beforeAll'>;
  beforeEach?: Phs<'beforeEach'>;
  afterAll?: Phs<'afterAll'>;
  afterEach?: Phs<'afterEach'>;
};

export type ToCreateTests_F = <F extends Fn>(
  f: F,
  implementation?: () => Promise<F> | F,
) => (...cases: TestArgs<F>) => void;
