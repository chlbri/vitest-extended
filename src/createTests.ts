import { beforeAll, vi } from 'vitest';
import { useTFA } from './acceptation';
import type { _CreateTests_F, CreateTests_F } from './createTests.types';
import { useErrorAsyncEach } from './each/error';
import {
  useEachAsync,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type useEach,
} from './each/pass';
import { toStringFlat } from './toStringFlat';

const _create: _CreateTests_F = (func, transform, toError, name) => {
  return {
    acceptation: () => useTFA(func, name),

    fails: (...cases) => {
      const length = cases.length;

      return () => {
        const useTests = useErrorAsyncEach(func, transform, toError);

        const _cases: any = cases.map(
          ({ invite: _invite, parameters, error }, index) => {
            const invite = `#${toStringFlat(index + 1, length)} => ${_invite}`;
            const out = { invite, parameters, error };
            return out;
          },
        );

        return useTests(..._cases);
      };
    },

    success: (...cases) => {
      const length = cases.length;
      return () => {
        const useTests = useEachAsync(func, transform);

        const _cases: any = cases.map(
          ({ invite: _invite, parameters, expected }, index) => {
            const invite = `#${toStringFlat(index + 1, length)} => ${_invite}`;
            const out = { invite, parameters, expected };
            return out;
          },
        );

        return useTests(..._cases);
      };
    },
  };
};

/**
 * Creates tests for function in a better way
 * NB : We use strict-equality, {@link useEach|see}
 * @param library The test library
 * @param f The function to test
 * @param
 * @returns A test.each like function to tests many cases
 *
 * NB: If the first argument is an array, wrap the value in another array,
 *
 * @example
 * // ./add.ts
 *export const add = (args: string[]) => args.reduce(
 *    (acc, value) => {
 *      acc+=value
 *      return acc;
 *    },
 *  0)
 *
 *
 * // .add.test.ts
 *import { createTests } from '@bemedev/vitest-extended';
 *import { add } from './add';
 *
 *const useTests = createTests(add)
 *
 *useTests(
 *   {
 *     invite: 'For : 1,2,3,4,5,6,7,8,9',
 *     parameters: [[1, 2, 3, 4, 5, 6, 7, 8, 9]], // like this!
 *   }
 *)
 *
 */
export const createTests: CreateTests_F = (func, args) => {
  const { transform, toError } = args || {};
  return _create(func, transform, toError);
};

createTests.withImplementation = (
  f,
  { instanciation, name, transform, toError },
) => {
  const func = vi.fn(f);

  if (instanciation) {
    beforeAll(async () => {
      const impl = await instanciation();
      func.mockImplementation(impl);
    });
  }

  return _create(func, transform, toError, name);
};

createTests.withoutImplementation = createTests;
