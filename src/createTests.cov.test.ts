import { t } from '@bemedev/types';
import { describe } from 'vitest';
import { createTests } from './createTests';

describe('CreateTests - Coverage', () => {
  type Add_F = (numb1: number, numb2: number) => number;
  const add: Add_F = (numb1, numb2) => numb1 + numb2;
  const addTest = t.anify<Add_F>();

  describe('#2 => CreateTests, funcTest is initialazed', () => {
    const useTests = createTests(addTest, () => add);

    useTests(
      {
        invite: '0 + 0 = 0',
        parameters: [0, 0],
        expected: 0,
      },
      {
        invite: '99 + 1 = 0',
        parameters: [99, 1],
        expected: 100,
      },
      {
        invite: '1 + 1 = 0',
        parameters: [1, 1],
        expected: 2,
      },
    );
  });
});
