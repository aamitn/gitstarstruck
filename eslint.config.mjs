import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Disabling specific rules globally
      '@typescript-eslint/no-unused-vars': 'off', // Disable no-unused-vars
      'react/no-unescaped-entities': 'off', // Disable no-unescaped-entities
      'react-hooks/exhaustive-deps': 'off', // Disable exhaustive-deps for hooks
    },
  },
];

export default eslintConfig;
