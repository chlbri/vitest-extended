import { describe } from 'vitest';
import { useEach, useTestFunctionAcceptation } from '../index';
import { toUpper } from './toUpper';

describe('#0 => Acceptation', () => useTestFunctionAcceptation(toUpper));

describe('#1 => Workflows', () => {
  useEach(toUpper)(
    [
      '#1 => I have a great test',
      ['I have a great test'],
      'I HAVE A GREAT TEST',
    ],
    ['#2 => Ich liebe dich', ['Ich liebe dich'], 'ICH LIEBE DICH'],
    ['#3 => ShoRt Test', ['ShoRt Test'], 'SHORT TEST'],
  );
});
