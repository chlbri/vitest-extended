import { describe } from 'vitest';
import { useTFA } from './acceptation';
import { useEachAsync, type useEachCases } from './each';
import type { Fc, TestArgs } from './types';

/**
 * Creates tests for function in a better way
 * NB : We use strict-equality, {@link useEachCases|see}
 * @param library The test library
 * @param f The function to test
 * @returns A test.each like function to tests many cases
 */
export function createTests<F extends Fc>(f: F) {
  type Cases = TestArgs<F>;
  // type Re = TestReturn<F,TestArgs<F>>

  return (...cases: Cases) => {
    describe('#0 => Accepation', () => useTFA(f));

    const forward = cases.length >= 1;
    if (forward) {
      describe('#1 => Workflows', () => {
        const useTestAsync = useEachAsync(f);
        const _cases = cases.map(
          ([_invite, parameters, expected], iter) => {
            const invite = `#${iter + 1} => ${_invite}`;
            const out = [invite, parameters, expected];
            return out;
          },
        ) as Cases;

        useTestAsync(..._cases);
      });
    }
  };
}
