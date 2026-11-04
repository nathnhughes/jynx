import { createRequire } from 'node:module'
import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import { createNodeResolver, flatConfigs as importXConfigs } from 'eslint-plugin-import-x'
import prettier from 'eslint-config-prettier/flat'
import globals from 'globals'

const reactVersion = createRequire(import.meta.url)('react/package.json').version

export default defineConfig([
  globalIgnores(['dist', 'coverage', '.claude', 'docs', 'rollup.config.js', '**/*.md']),
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  importXConfigs.recommended,
  importXConfigs.typescript,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    settings: {
      'import-x/resolver-next': [createNodeResolver({ extensions: ['.ts', '.tsx', '.d.ts', '.js'] })],
      // 'detect' calls context.getFilename(), which ESLint 10 removed
      react: { version: reactVersion }
    },
    rules: {
      'no-param-reassign': ['error', { props: false }],
      'no-console': 'off',
      'consistent-return': 'off',
      'no-nested-ternary': 'off',
      'no-constant-condition': ['warn', { checkLoops: false }],
      // Import
      'import-x/newline-after-import': 'warn',
      'import-x/no-duplicates': 'warn',
      'import-x/no-useless-path-segments': 'warn',
      'import-x/order': 'off',
      'import-x/prefer-default-export': 'off',
      'import-x/extensions': 'off',
      // React
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-filename-extension': 'off',
      // Typescript
      '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variableLike',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow'
        }
      ]
    }
  },
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/naming-convention': 'off'
    }
  },
  prettier
])
