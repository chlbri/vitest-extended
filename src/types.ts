import type { Fn, LengthOf } from '@bemedev/types';

export type SimpleParams<F extends Fn, P extends any[] = Parameters<F>> =
  LengthOf<P> extends 0
    ? { parameters?: never }
    : 1 extends LengthOf<P>
      ? undefined extends P[0]
        ? { parameters?: P | P[0] }
        : P[0] extends P[1]
          ? { parameters?: P | P[0] }
          : { parameters: P | P[0] }
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

export type TestReturn<F extends Fn, A extends TestArgs<F>> =
  LengthOf<A> extends 0 ? Fn<TestArgs<F>, void> : void;

export type TestDoneFunction = Fn<[context: () => boolean], void>;

export type ToCreateTestsWithImplementation_F = <F extends Fn>(
  f: F,
  implementation: { instanciation: () => Promise<F> | F; name: string },
) => (...cases: TestArgs<F>) => void;
