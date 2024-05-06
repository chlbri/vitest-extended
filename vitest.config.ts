import { aliasTs } from '@bemedev/vitest-alias';
import { defineConfig } from 'vitest/config';
import tsconfig from './tsconfig.json';

export default defineConfig({
  plugins: [aliasTs(tsconfig as any)],

  test: {
    environment: 'node',
    globals: true,
    coverage: {
      enabled: true,
      extension: 'ts',
      include: [
        'src/acceptation.ts',
        'src/createTests.ts',
        'src/each.ts',
        'src/types.ts',
      ],
      all: true,
      provider: 'v8',
    },
  },
});
