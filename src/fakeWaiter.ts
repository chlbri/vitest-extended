import sleep from '@bemedev/sleep';
import { vi } from 'vitest';
import type { FakeWaiter_F } from './types';

export const fakeWaiter: FakeWaiter_F = async ({
  ms = 0,
  times = 1,
  fake,
}) => {
  for (let i = 0; i < times; i++) {
    if (fake) await vi.advanceTimersByTimeAsync(ms);
    else await sleep(ms);
  }
};
