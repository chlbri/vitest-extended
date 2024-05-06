import { createTests } from './createTests';
import { isFunction } from './isFunction';

const useTests = createTests(isFunction);

useTests(
  ['Function type', [function () {}], true],
  ['Arrow Function', [() => {}], true],
  ['Function with return', [() => 1], true],
  ['Async Function', [async function asyncFunction() {}], true],
  [
    'Async Function with return',
    [
      function asyncFunction() {
        return Promise.resolve(5);
      },
    ],
    true,
  ],
  ['Array Class', [Array], true],
  ['Symbol Class', [Symbol], true],
  ['Empty Object => false', [{}], false],
  ['Plain Object => false', [{ a: 3, b: 'b' }], false],
  ['true => false', [true], false],
  ['false => false', [false], false],
  ['0 => false', [0], false],
  ['ALLO (string) => false', ['ALLO'], false],
);
