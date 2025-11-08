import { Config } from 'jest';

const config: Config = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts', '!src/**/index.ts', '!src/main.ts', '!src/prisma-client'],
    coverageDirectory: '<rootDir>/reports/dma-resources-server',
    coverageReporters: ['text-summary', 'html'],
    // coverageThreshold: {
    //     global: {
    //         branches: 80,
    //         functions: 80,
    //         lines: 80,
    //         statements: 80,
    //     },
    // },
    displayName: 'dma-resources-server',
    moduleNameMapper: {
        '@dnd-mapp/dma-resources-server/models': ['<rootDir>/models/index.ts'],
    },
    preset: './jest-preset.mjs',
    rootDir: __dirname,
    setupFilesAfterEnv: ['<rootDir>/test/setup-test.ts'],
    testMatch: '<rootDir>/src/**/*.spec.ts',
    transform: {
        '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    },
};

export default config;
