export default {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/**/jest.config.ts'],
  // The test environment that will be used for testing
  testEnvironment: 'node',
  // The glob patterns Jest uses to detect test files
  testMatch: ['*./spec.ts', '*.spec.tsx'],
};
