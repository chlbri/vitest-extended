import { describe, expect, test } from 'vitest';
import { z } from 'zod';
import { Fc, TestReturn, useTFA } from '../index';
import { transformZTF, type Any } from './zod';

// #region Types
type TFunc = ReturnType<typeof transformZTF<z.ZodString>>;
type TT = (zod: Any) => TestReturn<TFunc, []>;
// #endregion

export const useWorkflow = (createTest: TT) => {
  describe('#1 => string', () => {
    const useTest = createTest(z.string());

    useTest(
      ['#1 => boolean fails', [true], false],
      ['#2 => number fails', [5], false],
      ['#3 => string pass', ['str'], true],
    );
  });

  describe('#2 => number', () => {
    const useTest = createTest(z.number());

    useTest(
      ['#1 => boolean fails', [true], false],
      ['#2 => number pass', [5], true],
      ['#3 => string fails', ['str'], false],
    );
  });

  describe('#3 => enum ["PILE", "FACE"]', () => {
    const useTest = createTest(z.enum(['PILE', 'FACE']));

    useTest(
      ['#1 => boolean fails', [true], false],
      ['#2 => number fails', [5], false],
      ['#3 => simple string fails', ['str'], false],
      ['#4 => string PILE pass', ['PILE'], true],
      ['#5=> string FACE pass', ['FACE'], true],
    );
  });
};

export const _useTFA = <F extends Fc>(f: F) => {
  describe('#0 => Accceptation', () => useTFA(f));

  describe('#1 => It create function', () => {
    const zod = z.string();
    const tester = f(zod);

    test('#1 => The created value is defined', () => {
      expect(tester).toBeDefined();
    });

    test('#2=> The created value is a function', () => {
      expect(typeof tester).toBe('function');
    });
  });
};
