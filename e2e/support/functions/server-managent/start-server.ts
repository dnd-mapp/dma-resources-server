import { spawn } from 'node:child_process';
import { config } from '../../constants';

export function startServer() {
    config.serverProcess = spawn('npm', ['run', 'start'], {
        stdio: 'inherit',
        shell: true,
    });
}
