import { getServerPort } from './get-server-port';
import { isServerRunning } from './is-server-running';
import { startServer, waitUntilServerIsRunning } from './server-process';

const host = process.env['HOST'] || 'localhost';
const port = getServerPort(3000);

export default async () => {
    const url = `http://${host}:${port}/server`;

    if (!(await isServerRunning(url))) {
        startServer();
        await waitUntilServerIsRunning(url);
    }
};
