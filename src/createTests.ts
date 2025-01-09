import { describe } from 'vitest';
import { useTFA } from './acceptation';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEachAsync, type useEachCases } from './each';
import { toString2 } from './toString2';
import type { ToCreateTests_F } from './types';

/**
 * Creates tests for function in a better way
 * NB : We use strict-equality, {@link useEachCases|see}
 * @param library The test library
 * @param f The function to test
 * @returns A test.each like function to tests many cases
 */
export const createTests: ToCreateTests_F = f => {
  return (...cases) => {
    describe('#0 => Accepation', () => useTFA(f));
    const length = cases.length;
    const forward = length >= 1;

    if (forward) {
      describe('#1 => Workflows', () => {
        const useTestAsync = useEachAsync(f);
        const _cases = cases.map(
          ({ invite: _invite, parameters, expected }, iter) => {
            const invite = `#${toString2(iter + 1, length)} => ${_invite}`;
            const out = { invite, parameters, expected };
            return out;
          },
        );

        return useTestAsync(...(_cases as any));
      });
    }
  };
};
