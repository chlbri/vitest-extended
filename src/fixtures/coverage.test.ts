import { describe } from 'vitest';
import { createTests } from '../createTests';
import { addMany, expected, noArgs } from './coverage';

describe('funcNoArgs - to cov', () => {
  const useTests = createTests(noArgs);

  useTests(
    { expected, invite: 'No Args' },
    { expected, invite: 'No Args - again' },
  );
});

describe('addMany - to cov', () => {
  const useTests = createTests(addMany);

  useTests(
    { expected: 0, invite: 'No Args' },
    {
      expected: 1,
      invite: '1',
      parameters: 1,
    },
    {
      expected: 10,
      invite: '10',
      parameters: 10,
    },
    {
      expected: 45,
      invite: '1,2,3,4,5,6,7,8,9',
      parameters: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      expected: 45,
      invite: '0,1,2,3,4,5,6,7,8,9',
      parameters: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  );
});
