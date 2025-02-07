import sleep from '@bemedev/sleep';
import { vi } from 'vitest';

export const fakeWaiter = async (ms = 0, times = 1) => {
  const check = vi.isFakeTimers();
  for (let i = 0; i < times; i++) {
    if (check) await vi.advanceTimersByTimeAsync(ms);
    else await sleep(ms);
  }
};
