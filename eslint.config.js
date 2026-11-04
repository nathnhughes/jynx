const { defineConfig, globalIgnores } = require('eslint/config')
const js = require('@eslint/js')
const tseslint = require('typescript-eslint')
const react = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
const jsxA11y = require('eslint-plugin-jsx-a11y')
const importX = require('eslint-plugin-import-x')
const prettier = require('eslint-config-prettier/flat')
const globals = require('globals')

module.exports = defineConfig([
  globalIgnores(['dist', 'coverage', 'docs', 'rollup.config.js', '**/*.md']),
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname
      }
    },
    settings: {
      'import-x/resolver-next': [importX.createNodeResolver({ extensions: ['.ts', '.tsx', '.d.ts', '.js'] })],
      // 'detect' calls context.getFilename(), which ESLint 10 removed
      react: { version: require('react/package.json').version }
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
      sourceType: 'commonjs',
      globals: globals.node
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/naming-convention': 'off'
    }
  },
  prettier
])
