import type {Config} from 'jest';

const config: Config = {
  verbose: true,

  testEnvironment: 'jsdom',

  automock: false,

  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$',

  moduleNameMapper: {

    '\\.(css|scss)$': 'identity-obj-proxy',

  },
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts"
  ]
};

export default config;
