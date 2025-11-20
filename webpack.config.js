const CopyWebpackPlugin = require('copy-webpack-plugin');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');
const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');

const basePackageJson = {
    name: '@dnd-mapp/dma-resources-server',
    description: 'The static resources server of the D&D Mapp platform',
    license: 'AGPL-3.0',
    author: {
        name: 'NoNamer777',
        email: 'mail.dndmapp@gmail.com',
    },
    repository: {
        type: 'git',
        url: 'git+https://github.com/dnd-mapp/dma-resources-server.git',
    },
    main: './main.js',
};

module.exports = (options) => {
    return {
        ...options,
        externals: [nodeExternals()],
        output: {
            path: resolve(__dirname, 'dist/dma-resources-server'),
            clean: true,
        },
        plugins: [
            ...options.plugins,
            new GeneratePackageJsonPlugin(basePackageJson, {
                excludeDependencies: ['node:path', 'node:url', 'node:buffer'],
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: resolve(__dirname, 'public'), to: resolve(__dirname, 'dist/dma-resources-server/public') },
                ],
            }),
        ],
    };
};
