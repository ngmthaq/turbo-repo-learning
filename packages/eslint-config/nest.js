import globals from 'globals';
import { config as baseConfig } from './base.js';

/**
 * NestJS ESLint configuration
 * Extends base.js
 * @type {import('eslint').Linter.Config[]}
 */
export const config = [
  // --------------------
  // Base rules
  // --------------------
  ...baseConfig,

  // --------------------
  // NestJS / Node overrides
  // --------------------
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      // Common NestJS patterns
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Useful for DI-heavy code
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
];
