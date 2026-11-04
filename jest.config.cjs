/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageReporters: ['text', 'lcov'],
  globals: {
    'ts-jest': {
      // ts-jest compiles to CommonJS, which verbatimModuleSyntax forbids
      tsconfig: { verbatimModuleSyntax: false }
    }
  }
}
