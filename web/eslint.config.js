import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier: eslintPluginPrettier,
            '@tanstack/query': pluginQuery,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'prettier/prettier': 'error',
            '@tanstack/query/exhaustive-deps': 'error',
            '@tanstack/query/no-rest-destructuring': 'warn',
            '@tanstack/query/stable-query-client': 'error',
            '@tanstack/query/no-unstable-deps': 'error',
            '@tanstack/query/infinite-query-property-order': 'error',
            '@tanstack/query/no-void-query-fn': 'error',
        },
    }
);
