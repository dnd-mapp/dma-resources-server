const { resolve } = require('path');

module.exports = (options) => ({
    ...options,
    output: {
        path: resolve(__dirname, 'dist/dma-resources-server'),
        clean: true,
    },
});
