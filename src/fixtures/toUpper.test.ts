import { describe } from 'vitest';
import { useTestFunctionAcceptation } from '../acceptation';
import { useEach, useEachAsync } from '../each';
import { TestArgs } from '../types';
import { toUpper } from './toUpper';

describe('#0 => Acceptation', () => useTestFunctionAcceptation(toUpper));

describe('#1 => Workflows', () => {
  describe('#1 => toUpper', () => {
    const CASES: TestArgs<typeof toUpper> = [
      [
        '#1 => I have a great test',
        ['I have a great test'],
        ['I HAVE A GREAT TEST'],
      ],
      ['#2 => Ich liebe dich', ['Ich liebe dich'], ['ICH LIEBE DICH']],
      ['#3 => ShoRt Test', ['ShoRt Test'], ['SHORT TEST']],
      [
        '#4 => Array of texts',
        ['ShoRt Test', 'ShoRt Test again'],
        ['SHORT TEST', 'SHORT TEST AGAIN'],
      ],
      [
        '#4 => Array of texts, (not sorted)',
        ['ShoRt Test', 'ShoRt Test again'],
        ['SHORT TEST AGAIN', 'SHORT TEST'],
      ],
      [
        '#4 => Array of texts, (not sorted)',
        ['ShoRt Test', 'ShoRt Test again'],
        ['SHORT TEST AGAIN', 'SHORT TEST'],
      ],
    ];

    describe('#1 => Sync', () => {
      useEach(toUpper, ...CASES);
    });

    describe('#2 => Async', () => {
      const f = async (...args: any[]) => toUpper(...args);
      useEachAsync(f, ...CASES);
    });
  });
});
