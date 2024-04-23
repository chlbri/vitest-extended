import tsConfigPaths from 'rollup-plugin-tsconfig-paths';
import typescript from 'rollup-plugin-typescript2';

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'src/index.ts',
  plugins: [tsConfigPaths(), typescript()],

  external: ['vitest'],
  output: [
    {
      format: 'cjs',
      file: 'lib/index.cjs',
      sourcemap: true,
    },
    {
      format: 'es',
      sourcemap: true,
      file: 'lib/index.js',
    },
  ],
};
