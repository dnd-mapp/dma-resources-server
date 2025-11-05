import { spawn } from 'node:child_process';
import { platform } from 'node:os';
import { config } from '../../constants';
import { delay } from '../utils';

export async function stopServer() {
    if (platform() === 'win32') {
        spawn('taskkill', ['/F', '/T', '/PID', config.serverProcess.pid.toString()], { stdio: 'ignore' });
    } else {
        config.serverProcess.kill('SIGTERM');
    }

    await delay(2000);
    config.serverProcess = null;
}
