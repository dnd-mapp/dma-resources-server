import { hasStartedServer, stopServer } from './functions';

async function teardown() {
    if (!hasStartedServer()) return;
    await stopServer();
}

export default teardown;
