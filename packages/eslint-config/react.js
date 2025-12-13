import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import { config as baseConfig } from './base.js';

/**
 * React ESLint configuration
 * Extends base.js
 * @type {import('eslint').Linter.Config[]}
 */
export const config = [
  // --------------------
  // Extend base config
  // --------------------
  ...baseConfig,

  // --------------------
  // React rules
  // --------------------
  {
    files: ['**/*.jsx', '**/*.tsx'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Core React rules
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,

      // Hooks rules (strict)
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',

      // Accessibility (strict but practical)
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/no-static-element-interactions': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',

      // Modern React adjustments
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
];
