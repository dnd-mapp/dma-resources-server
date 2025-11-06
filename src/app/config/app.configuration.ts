import { readFile } from 'fs/promises';
import { DEFAULT_HOST, DEFAULT_PORT, EnvironmentVariableNames } from '../constants';
import { parsePort, tryCatchAsync } from '../utils';

export interface SslConfiguration {
    cert: string;
    key: string;
}

export interface AppConfiguration {
    host: string;
    port: number;
    ssl?: SslConfiguration;
}

async function read(path: string) {
    const { data, error } = await tryCatchAsync(readFile(path, { encoding: 'utf8' }));

    if (error) throw error;
    return data;
}

export function sslEnabled() {
    return (
        process.env[EnvironmentVariableNames.SSL_CERT_PATH] !== undefined &&
        process.env[EnvironmentVariableNames.SSL_KEY_PATH] !== undefined
    );
}

export async function getSSLFiles() {
    if (!sslEnabled()) return { cert: null, key: null };
    return {
        cert: await read(process.env[EnvironmentVariableNames.SSL_CERT_PATH]),
        key: await read(process.env[EnvironmentVariableNames.SSL_KEY_PATH]),
    };
}

async function appConfiguration() {
    return {
        app: {
            host: process.env[EnvironmentVariableNames.HOST] || DEFAULT_HOST,
            port: parsePort(process.env[EnvironmentVariableNames.PORT], DEFAULT_PORT),
            ssl: sslEnabled() ? await getSSLFiles() : undefined,
        } satisfies AppConfiguration,
    };
}

export default appConfiguration;
