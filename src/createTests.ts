import type { Fn } from '@bemedev/types';
import { beforeAll, vi } from 'vitest';
import { useTFA } from './acceptation';
import type { _CreateTests_F, CreateTests_F } from './createTests.types';
import { useErrorAsyncEach, useErrorEach } from './each/error';
import {
  useEachAsync,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type useEachCases,
} from './each/pass';
import { toString2 } from './toString2';

const isAsyncFunc = <
  Func extends { params: any[]; return: any } = {
    params: any[];
    return: any;
  },
>(
  func: any,
): func is Fn<Func['params'], Promise<Func['return']>> => {
  const AsyncFunction = (async () => {}).constructor;

  const check1 = func instanceof AsyncFunction === true;
  const check2 = func[Symbol.toStringTag] === 'AsyncFunction';
  const check3 = func.constructor.name === 'AsyncFunction';

  return check1 || check2 || check3;
};

const _createTests: _CreateTests_F = (func, toError) => {
  return {
    acceptation: () => useTFA(func),
    fails:
      (...cases) =>
      () => {
        const length = cases.length;
        const forward = length >= 1;

        if (forward) {
          const check = isAsyncFunc(func);

          const useTestAsync = check
            ? useErrorAsyncEach(func, toError)
            : useErrorEach(func, toError);

          const _cases: any = cases.map(
            ({ invite: _invite, parameters }, iter) => {
              const invite = `#${toString2(iter + 1, length)} => ${_invite}`;
              const out = { invite, parameters };
              return out;
            },
          );

          return useTestAsync(..._cases);
        }
      },
    success:
      (...cases) =>
      () => {
        const length = cases.length;
        const forward = length >= 1;

        if (forward) {
          const useTestAsync = useEachAsync(func);

          const _cases: any = cases.map(
            ({ invite: _invite, parameters, expected }, iter) => {
              const invite = `#${toString2(iter + 1, length)} => ${_invite}`;
              const out = { invite, parameters, expected };
              return out;
            },
          );

          return useTestAsync(..._cases);
        }
      },
  };
};

/**
 * Creates tests for function in a better way
 * NB : We use strict-equality, {@link useEachCases|see}
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
export const createTests: CreateTests_F = (func, toError) => {
  return _createTests(func, toError);
};

createTests.withImplementation = (f, { instanciation, name }, toError) => {
  const func = vi.fn(f);

  if (instanciation) {
    beforeAll(async () => {
      const impl = await instanciation();
      func.mockImplementation(impl);
    });
  }

  return _createTests(func, toError, name);
};

createTests.withoutImplementation = createTests;
