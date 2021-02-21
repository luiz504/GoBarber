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
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'babel',
};
