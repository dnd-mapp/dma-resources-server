import { ChildProcessWithoutNullStreams } from 'child_process';

export interface Config {
    host: string;
    port: number;
    serverProcess?: ChildProcessWithoutNullStreams;
}
