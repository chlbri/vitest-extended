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
      format: 'es',
      sourcemap: true,
      preserveModulesRoot: 'src',
      dir: `lib`,
      preserveModules: true,
      entryFileNames: '[name].js',
    },
    {
      format: 'cjs',
      sourcemap: true,
      preserveModulesRoot: 'src',
      dir: `lib`,
      preserveModules: true,
      entryFileNames: '[name].cjs',
    },
  ],
};
