import type { Fn } from '@bemedev/types';
import type { TestErrors } from '../types';

export type ToError_F<F extends Fn> = (
  ...params: Parameters<F>
) => string | undefined;

export type _UseErrorEach_F = <F extends Fn>(
  f: F,
  toError?: ToError_F<F>,
  ...cases: TestErrors<F>
) => void;

export type UseErrorEach_F = <F extends Fn>(
  f: F,
  toError?: ToError_F<F>,
) => Fn<TestErrors<F>, void>;

export type _UseErrorAsyncEach_F = <F extends Fn<any, Promise<any>>>(
  f: F,
  toError?: ToError_F<F>,
  ...cases: TestErrors<F>
) => void;

export type UseErrorAsyncEach_F = <F extends Fn<any, Promise<any>>>(
  f: F,
  toError?: ToError_F<F>,
) => Fn<TestErrors<F>, void>;
