import { useEachAsync } from '../index';
import { sleep } from './sleep';

const asyncF = (ms = 0) => sleep(ms).then(() => 1);

useEachAsync(asyncF)(
  ['#1 => Sleep just a bit', [], 1],
  ['#1 => Sleep too much', [900], 1],
);
