import { t } from '@bemedev/types';
import { beforeAll, describe, test, vi } from 'vitest';
import { fakeWaiter } from './fakeWaiter';

describe('fakeWaiter', () => {
  const func = () => {
    return new Promise<string>(resolve => {
      setTimeout(() => {
        resolve('func1');
      }, 1000);
    });
  };

  describe('#1 => Real Timers', () => {
    let result = t.string;
    test('#1 => Perform function', () => {
      func().then(res => {
        result = res;
      });
    });

    test('#2 => result is not defined', ({ expect }) => {
      expect(result).toBeUndefined();
    });

    test('#3=> Wait', async () => {
      await fakeWaiter(1000);
    });

    describe('#4 => result is defined', () => {
      test('#1 => result is defined', ({ expect }) => {
        expect(result).toBeDefined();
      });

      test('#2 => result is equal to func1', ({ expect }) => {
        expect(result).toBe('func1');
      });
    });
  });

  describe('#2 => Fake Timers', () => {
    beforeAll(() => {
      vi.useFakeTimers();
    });

    let result = t.string;
    test('#1 => Perform function', () => {
      func().then(res => {
        result = res;
      });
    });

    test('#2 => result is not defined', ({ expect }) => {
      expect(result).toBeUndefined();
    });

    test('#3=> Wait', async () => {
      await fakeWaiter(1000);
    });

    describe('#4 => result is defined', () => {
      test('#1 => result is defined', ({ expect }) => {
        expect(result).toBeDefined();
      });

      test('#2 => result is equal to func1', ({ expect }) => {
        expect(result).toBe('func1');
      });
    });
  });
});
