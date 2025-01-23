import type { Fn } from '@bemedev/types';
import type { Mock } from 'vitest';
import type { ToError_F } from './each/error.types';
import type { TestArgs, TestErrors } from './types';

type ReturnR<F extends Fn> = {
  acceptation: () => void;
  success: (...cases: TestArgs<F>) => () => void;
  fails: (...cases: TestErrors<F>) => () => void;
};

export type _CreateTests_F = <F extends Fn>(
  func: F,
  toError?: ToError_F<F>,
  name?: string,
) => ReturnR<F>;

export interface CreateTests_F {
  <F extends Fn>(func: F, toError?: ToError_F<F>): ReturnR<F>;

  withImplementation: <F extends Fn>(
    f: F,
    params: {
      instanciation: () => Promise<F> | F;
      name: string;
    },
    toError?: ToError_F<F>,
  ) => ReturnR<Mock<F>>;

  withoutImplementation: <F extends Fn>(
    func: F,
    toError?: ToError_F<F>,
  ) => ReturnR<F>;
}
