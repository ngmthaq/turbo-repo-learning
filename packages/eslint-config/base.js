import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export const config = [
  // --------------------
  // Ignore folders
  // --------------------
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  // --------------------
  // Config / build files (NO TS resolver here)
  // --------------------
  {
    files: [
      '**/*.config.ts',
      '**/*.config.js',
      'vite.config.ts',
      'vitest.config.ts',
      'eslint.config.js',
    ],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'import/order': 'off',
      'import/no-duplicates': 'off',
      'import/no-unresolved': 'off',
    },
  },

  // --------------------
  // Base JS rules
  // --------------------
  js.configs.recommended,

  // --------------------
  // TypeScript application code ONLY
  // --------------------
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: [
            './tsconfig.json',
            './apps/*/tsconfig.json',
            './apps/*/tsconfig.app.json',
            './apps/*/tsconfig.build.json',
            './packages/*/tsconfig.json',
          ],
        },
      },
    },
    rules: {
      ...tseslint.configs.recommended[0].rules,

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],

      'import/no-duplicates': 'error',
      'import/newline-after-import': 'error',
      'import/no-unresolved': 'off',
    },
  },

  // --------------------
  // Test files
  // --------------------
  {
    files: [
      '**/*.spec.ts',
      '**/*.test.ts',
      '**/*.spec.tsx',
      '**/*.test.tsx',
      '**/*e2e-spec.ts',
    ],
    languageOptions: {
      globals: globals.jest,
    },
  },

  // --------------------
  // Turborepo
  // --------------------
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'error',
    },
  },

  // --------------------
  // Prettier LAST
  // --------------------
  eslintPluginPrettierRecommended,
];
