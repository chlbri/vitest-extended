import { describe } from 'vitest';
import { useTestFunctionAcceptation } from '../acceptation';
import { useEach } from '../each';
import { TestArgs } from '../types';
import { toUpper } from './toUpper';

describe('#0 => Acceptation', () => useTestFunctionAcceptation(toUpper));

describe('#1 => Workflows', () => {
  const CASES: TestArgs<typeof toUpper> = [
    [
      '#1 => I have a great test',
      ['I have a great test'],
      'I HAVE A GREAT TEST',
    ],
    ['#2 => Ich liebe dich', ['Ich liebe dich'], 'ICH LIEBE DICH'],
    ['#3 => ShoRt Test', ['ShoRt Test'], 'SHORT TEST'],
  ];

  describe('#1 => In two functions', () => {
    useEach(toUpper)(...CASES);
  });
  describe('#1 => In two functions', () => {
    useEach(toUpper, ...CASES);
  });
});
