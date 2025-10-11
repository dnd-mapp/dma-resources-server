/**
 * @type {import('jest').Config}
 */
export default {
    cacheDirectory: '.jest',
    clearMocks: true,
    moduleFileExtensions: ['js', 'ts'],
    randomize: true,
    reporters: ['default'],
    showSeed: true,
    slowTestThreshold: 300,
    testEnvironment: 'node',
};
