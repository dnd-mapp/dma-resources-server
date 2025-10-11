import { Config } from 'jest';

const config: Config = {
    cacheDirectory: '.jest',
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts', '!src/**/index.ts', '!src/main.ts'],
    coverageDirectory: '<rootDir>/reports/dma-resources-server',
    coverageReporters: ['text-summary', 'html'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    displayName: 'dma-resources-server',
    moduleFileExtensions: ['js', 'ts'],
    randomize: true,
    reporters: ['default'],
    rootDir: __dirname,
    setupFilesAfterEnv: ['<rootDir>/test/setup-test.ts'],
    showSeed: true,
    slowTestThreshold: 300,
    testMatch: '<rootDir>/src/**/*.spec.ts',
    testEnvironment: 'node',
    transform: {
        '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
};

export default config;
