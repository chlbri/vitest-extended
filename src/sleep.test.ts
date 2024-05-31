import { describe } from 'vitest';
import { useEachAsync } from './each';
import { TestArgs } from './types';
import { sleep } from './sleep';

const asyncF = (ms = 0) => sleep(ms).then(() => 1);
const CASES: TestArgs<typeof asyncF> = [
  ['#1 => Sleep just a bit', [], 1],
  ['#2 => Sleep too much', [900], 1],
];

describe('#1 => In two functions', () => {
  useEachAsync(asyncF)(...CASES);
});

describe('#2 => In one function', () => {
  useEachAsync(asyncF, ...CASES);
});
