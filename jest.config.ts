import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: false,
  coverageReporters: ['text'],
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
export default config;
