import { aliasTs } from '@bemedev/vitest-alias';
import { exclude } from '@bemedev/vitest-cov-exclude';
import { defineConfig } from 'vitest/config';

import tsconfig from './tsconfig.json';

export default defineConfig({
  plugins: [aliasTs(tsconfig as any), exclude('**/index.ts')],

  test: {
    environment: 'node',
    globals: true,
    coverage: {
      enabled: true,
      extension: 'ts',
      all: true,
      provider: 'v8',
    },
  },
});
