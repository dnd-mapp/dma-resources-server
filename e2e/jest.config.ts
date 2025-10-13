import { Config } from 'jest';

const config: Config = {
    displayName: 'dma-resources-server-e2e',
    globalSetup: '<rootDir>/support/global-setup.ts',
    globalTeardown: '<rootDir>/support/global-teardown.ts',
    preset: '../jest-preset.mjs',
    rootDir: __dirname,
    setupFilesAfterEnv: ['<rootDir>/support/setup-test.ts'],
    testEnvironment: 'node',
    testMatch: '<rootDir>/**/*.spec.ts',
    transform: {
        '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
};

export default config;
