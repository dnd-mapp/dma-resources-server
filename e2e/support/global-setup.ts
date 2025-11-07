import { config, DEFAULT_SERVER_HOST, DEFAULT_SERVER_PORT } from './constants';
import { parsePort } from './functions';

function setup() {
    console.log('\n\nRunning global setup...');

    config.host = process.env['DMA_HOST'] ?? DEFAULT_SERVER_HOST;
    config.port = parsePort(process.env['DMA_PORT'], DEFAULT_SERVER_PORT);
}

export default setup;
