import { config, DEFAULT_SERVER_HOST, DEFAULT_SERVER_PORT } from './constants';
import { isServerAvailable, parsePort, startServer, tryCatchAsync, waitForServerAvailable } from './functions';

async function setup() {
    console.log('\n\nRunning global setup...');

    config.host = process.env['DMA_HOST'] ?? DEFAULT_SERVER_HOST;
    config.port = parsePort(process.env['DMA_PORT'], DEFAULT_SERVER_PORT);

    const { data: serverIsRunning, error } = await tryCatchAsync(isServerAvailable());

    if (error || !serverIsRunning) {
        startServer();
        await waitForServerAvailable();
    }
}

export default setup;
