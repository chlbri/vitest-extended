import js from '@eslint/js';
import parser from '@typescript-eslint/parser';

export default {
  ...js.configs.recommended,
  languageOptions: {
    globals: {
      node: true,
    },
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    parser,
  },
  plugins: {
    ' @typescript-eslint': {
      'no-explicit-any': 0,
      'ban-ts-comment': [
        'error',
        {
          'ts-ignore': 'allow-with-description',
        },
      ],
    },
  },
  rules: {
    indent: 0,
    'linebreak-style': 0,
    quotes: 0,
    semi: 0,
  },
  ignores: [
    'node_modules/*',
    'publish/*',
    'dist/*',
    'lib/*',
    'publish_npm',
    '**/*.test.ts',
  ],
  files: ['src/**/*.ts'],
};
