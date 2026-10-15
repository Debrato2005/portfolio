import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import hooks from 'eslint-plugin-react-hooks';
import refresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      '.local/**',
      '.agents/**',
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'output/playwright/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,mjs}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': hooks, 'react-refresh': refresh },
    rules: {
      ...hooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'error',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ['src/{app,routes,features,components}/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-globals': [
        'error',
        { name: 'fetch', message: 'Use the HTTP boundary in src/lib/api.' },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "CallExpression[callee.type='MemberExpression'][callee.property.name='fetch']",
          message: 'Use the HTTP boundary in src/lib/api.',
        },
      ],
    },
  },
  {
    files: ['src/lib/**/*.{ts,tsx}', 'src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/app/**', '**/routes/**', '**/features/**'],
              message:
                'Shared modules cannot depend on app, routes, or features.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/components/**/*.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
);
