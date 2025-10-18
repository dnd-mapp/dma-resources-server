import { spawn } from 'child_process';
import { ChildProcess, exec } from 'node:child_process';
import { platform } from 'os';
import { kill } from 'process';
import { isServerRunning } from './is-server-running';
import { tryCatch } from './try-catch';

let serverProcess: ChildProcess | null;
let processPid: number | undefined;
let hasStartedServer = false;

const MAX_ATTEMPTS = 10;

let attempt = 0;

export function startServer() {
    hasStartedServer = true;

    serverProcess = spawn('npm', ['run', 'start'], {
        shell: true,
        stdio: 'inherit',
    });
    serverProcess.unref();

    processPid = serverProcess.pid;

    serverProcess.on('error', (error) => {
        console.error(error);

        if (!processPid) return;
        if (platform() === 'win32') {
            exec(`taskkill /PID ${processPid} /T /F`);
        } else {
            kill(-processPid);
        }
        serverProcess = null;
        processPid = undefined;
    });
}

export function stopServer() {
    if (!hasStartedServer) return;

    if (!processPid) return;
    if (platform() === 'win32') {
        exec(`taskkill /PID ${processPid} /T /F`);
    } else {
        kill(-processPid);
    }
    serverProcess = null;
    processPid = undefined;
}

export async function waitUntilServerIsRunning(url: string) {
    const { data: isRunning, error } = await tryCatch(isServerRunning(url));

    if (error) throw error;
    if (isRunning) return;

    if (++attempt <= MAX_ATTEMPTS) {
        const delayTime = 1000 + attempt * 500;

        await new Promise<void>((resolve) => {
            const timeout = setTimeout(() => {
                clearTimeout(timeout);
                resolve();
            }, delayTime);
        });
        return await waitUntilServerIsRunning(url);
    }
    throw new Error('Failed to detect if server is running.');
}
