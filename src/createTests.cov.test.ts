import { maxLength, minLength, multiChar } from '@bemedev/basicfunc';
import { t } from '@bemedev/types';
import { describe } from 'vitest';
import { createTests } from './createTests';

describe('CreateTests - Coverage', () => {
  type Add_F = (numb1: number, numb2: number) => number;
  const add: Add_F = (numb1, numb2) => numb1 + numb2;
  const addTest = t.anify<Add_F>();

  describe('#2 => CreateTests, funcTest is initialazed', () => {
    const { success } = createTests.withImplementation(addTest, {
      instanciation: () => add,
      name: 'add',
    });

    describe(
      'Success',
      success(
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
      ),
    );
  });

  describe('#3 => Test errors', () => {
    describe('#1 => minLength', () => {
      const { fails, success, acceptation } =
        createTests.withoutImplementation(minLength, (min, value) => {
          return `"${value}" is shorter or equal than ${min}`;
        });

      describe('#0 => Acceptation', acceptation);

      describe(
        '#1 => Errors',
        fails(
          {
            invite: 'Equals',
            parameters: [2, 're'],
            error: '"re" is shorter or equal than 2',
          },
          { invite: 'Less -1', parameters: [2, 'r'] },
          { invite: 'Less -2', parameters: [2, ''] },
        ),
      );

      describe(
        '#2 => Success',
        success(
          {
            invite: '3 min and 4 chars',
            parameters: [3, multiChar('n', 4)],
            expected: multiChar('n', 4),
          },
          {
            invite: '6 min and 10 chars',
            parameters: [6, multiChar('n', 10)],
            expected: multiChar('n', 10),
          },
        ),
      );
    });

    describe('#2 => maxLength', () => {
      const maxL = (min: number, val: string): string =>
        maxLength(min, val as never);

      const { fails, success } = createTests(maxL);

      describe(
        '#1 => Errors',
        fails(
          { invite: 'Equals', parameters: [2, 're'] },
          { invite: 'More +1', parameters: [2, 'rer'] },
          { invite: 'Less +6', parameters: [4, multiChar('d', 10)] },
        ),
      );

      describe(
        '#2 => Success',
        success(
          {
            invite: '3 max and 2 chars',
            parameters: [3, multiChar('n', 2)],
            expected: multiChar('n', 2),
          },
          {
            invite: '10 max and 6 chars',
            parameters: [10, multiChar('n', 6)],
            expected: multiChar('n', 6),
          },
        ),
      );
    });

    describe('#3 => Promise rejects', () => {
      describe('#1 => Promise rejects "ARGS1"', () => {
        const error = 'ARGS';
        const func = async () => await Promise.reject(error);

        const { fails } = createTests(func, () => error);

        describe(
          '#1 => fails',
          fails(
            {
              invite: 'With provided error',
              error,
            },
            {
              invite: 'Without provided error',
            },
          ),
        );
      });

      describe('#1 => Promise rejects "ARGS2"', () => {
        const error = 'ARGS';
        const func = async () => await Promise.reject(error);

        const { fails } = createTests(func);

        describe(
          '#1 => fails',
          fails(
            {
              invite: 'With provided error',
              error,
            },
            {
              invite: 'Without provided error',
            },
          ),
        );
      });
    });
  });
});
