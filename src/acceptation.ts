import type { Fn } from '@bemedev/types';
import { expect, test } from 'vitest';
import { isFunction } from './isFunction';

export const useTestFunctionAcceptation = (f: Fn) => {
  const out = () => {
    const check = 'getMockName' in f && isFunction(f['getMockName']);
    const name = check ? (f as any).getMockName() : f.name;

    test(`#1 => ${name} is defined`, () => {
      expect(f).toBeDefined();
    });
    test(`#2 => ${name} is a function`, () => {
      const check = isFunction(f);
      expect(check).toBe(true);
    });
  };

  return out();
};

/**
 * For test only
 * useTestFunctionAcceptation
 */
export const useTFA = useTestFunctionAcceptation;
