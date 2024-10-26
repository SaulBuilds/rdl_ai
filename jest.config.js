// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',          // For testing Node environments (change to 'jsdom' for browser-like environment)
    testMatch: ['**/tests/**/*.test.ts'], // Looks for test files in the 'tests' directory
    moduleFileExtensions: ['ts', 'js'],
    globals: {
      'ts-jest': {
        isolatedModules: true,
      },
    },
  };