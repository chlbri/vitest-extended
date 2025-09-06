import type { Fn } from '#bemedev/globals/types';
import type { Mock } from 'vitest';
import type { ToError_F } from './each/error.types';
import type {
  ChainedFn,
  Identity,
  NextFn,
  TestArgs,
  TestErrors,
} from './types';

type ReturnR<F extends Fn> = {
  acceptation: () => void;
  success: (...cases: TestArgs<F>) => () => void;
  fails: (...cases: TestErrors<F>) => () => void;
};

export type _CreateTests_F = <
  F extends Fn,
  T extends NextFn<F> = Identity<F>,
>(
  func: F,
  transform?: T,
  toError?: ToError_F<F>,
  name?: string,
) => ReturnR<ChainedFn<F, T>>;

export interface CreateTests_F {
  <F extends Fn, T extends NextFn<F> = Identity<F>>(
    func: F,
    options?: { transform?: T; toError?: ToError_F<F> },
  ): ReturnR<ChainedFn<F, T>>;

  withImplementation: <F extends Fn, T extends NextFn<F> = Identity<F>>(
    f: F,
    params: {
      instanciation: () => Promise<F> | F;
      name: string;
      transform?: T;
      toError?: ToError_F<F>;
    },
  ) => ReturnR<Mock<ChainedFn<F, T>>>;

  withoutImplementation: <F extends Fn, T extends NextFn<F> = Identity<F>>(
    func: F,
    options?: { transform?: T; toError?: ToError_F<F> },
  ) => ReturnR<ChainedFn<F, T>>;
}
