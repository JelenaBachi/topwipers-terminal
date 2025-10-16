import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  globalIgnores(['dist', 'coverage']),

  js.configs.recommended,

  // TypeScript
  {
    files: ['**/*.{ts,tsx}'],
    ...tseslint.configs.recommendedTypeChecked,
    languageOptions: {
      parserOptions: {
        project: [path.join(__dirname, 'tsconfig.app.json')],
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // React
      'react/jsx-no-target-blank': 'warn',
      'react/no-unknown-property': 'warn',
      'react/react-in-jsx-scope': 'off',

      // React Hooks
      ...reactHooks.configs['recommended-latest'].rules,

      // React Refresh (vite)
      ...reactRefresh.configs.vite.rules,

      // TS
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },

  prettier,
]);
