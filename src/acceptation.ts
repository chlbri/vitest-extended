import { expect, test } from 'vitest';
import { isFunction } from './isFunction';
import type { Fc } from './types';

export const useTestFunctionAcceptation = (f: Fc) => {
  test(`#1 => ${f.name} is defined`, () => {
    expect(f).toBeDefined();
  });
  test(`#2 => ${f.name} is a function`, () => {
    const check = isFunction(f);
    expect(check).toBe(true);
  });
};

/**
 * For test only
 * useTestFunctionAcceptation
 */
export const useTFA = useTestFunctionAcceptation;
