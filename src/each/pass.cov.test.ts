import { describe, expect } from 'vitest';
import { useEach } from './pass';

describe('#01 => Specific tests', () => {
  describe('#01 => Sync', () => {
    const func = (a: number, b: number) => a + b;
    const tests = useEach(func, x => x.toLocaleString());

    tests(
      {
        invite: '1 + 2',
        parameters: [1, 2],
        expected: '3',
      },
      {
        invite: '1 + 2, with specific test',
        parameters: [1, 2],
        expected: '31',
        test: (value, expected) => {
          expect(value + 1).toBe(expected);
        },
      },
    );
  });
});
