import type { Fn, LengthOf } from '@bemedev/types';
import type { TestErrors } from '../types';

export type TestErrorReturn<F extends Fn, A extends TestErrors<F>> =
  LengthOf<A> extends 0 ? Fn<TestErrors<F>, void> : void;

export type ToError_F<F extends Fn> = (
  ...params: Parameters<F>
) => string | undefined;

export type UseErrorEachCases_F = <F extends Fn>(
  f: F,
  toError?: ToError_F<F>,
  ...cases: TestErrors<F>
) => void;

export type UseErrorEach_F = <F extends Fn, A extends TestErrors<F> = []>(
  f: F,
  toError?: ToError_F<F>,
  ...cases: A
) => TestErrorReturn<F, A>;

export type UseErrorAsyncEachCases_F = <F extends Fn<any, Promise<any>>>(
  f: F,
  toError?: ToError_F<F>,
  ...cases: TestErrors<F>
) => void;

export type UseErrorAsyncEach_F = <
  F extends Fn<any, Promise<any>>,
  A extends TestErrors<F> = [],
>(
  f: F,
  toError?: ToError_F<F>,
  ...cases: A
) => TestErrorReturn<F, A>;
