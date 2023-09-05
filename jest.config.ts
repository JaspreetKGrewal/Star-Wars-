import type {Config} from 'jest';

const config: Config = {
  verbose: true,

  testEnvironment: 'jsdom',

  automock: false,

  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$',

  moduleNameMapper: {

    '\\.(css|scss)$': 'identity-obj-proxy',

  },
};

export default config;
