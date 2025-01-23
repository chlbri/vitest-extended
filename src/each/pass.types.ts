import type { Fn } from '@bemedev/types';
import type { SimpleParams, TestArgs } from '../types';

export type _UseEach_F = <F extends Fn>(
  f: F,
  ...cases: TestArgs<F>
) => void;

export type UseEach_F = <F extends Fn>(
  f: F,
) => (
  ...cases: ({
    invite: string;
    expected: Awaited<ReturnType<F>>;
  } & SimpleParams<F, Parameters<F>>)[]
) => void;

export type _UseAsyncEach_F = <F extends Fn<any, Promise<any>>>(
  f: F,
  ...cases: TestArgs<F>
) => void;

export type UseAsyncEach_F = <F extends Fn<any, Promise<any>>>(
  f: F,
) => (
  ...cases: ({
    invite: string;
    expected: Awaited<ReturnType<F>>;
  } & SimpleParams<F, Parameters<F>>)[]
) => void;
