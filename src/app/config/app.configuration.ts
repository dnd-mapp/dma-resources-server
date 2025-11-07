import { readFile } from 'fs/promises';
import {
    DEFAULT_HOST,
    DEFAULT_MARIADB_HOST,
    DEFAULT_MARIADB_PORT,
    DEFAULT_MARIADB_SCHEMA,
    DEFAULT_MARIADB_USERNAME,
    DEFAULT_PORT,
    EnvironmentVariableNames,
} from '../constants';
import { parsePort, tryCatchAsync } from '../utils';

export interface SslConfiguration {
    cert: string;
    key: string;
}

export interface DatabaseConfiguration {
    username: string;
    password: string;
    host: string;
    port: number;
    schema: string;
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
        database: {
            username: process.env[EnvironmentVariableNames.MARIADB_USERNAME] || DEFAULT_MARIADB_USERNAME,
            password: process.env[EnvironmentVariableNames.MARIADB_PASSWORD],
            host: process.env[EnvironmentVariableNames.MARIADB_HOST] || DEFAULT_MARIADB_HOST,
            port: parsePort(process.env[EnvironmentVariableNames.MARIADB_PORT], DEFAULT_MARIADB_PORT),
            schema: process.env[EnvironmentVariableNames.MARIADB_SCHEMA] || DEFAULT_MARIADB_SCHEMA,
        } satisfies DatabaseConfiguration,
    };
}

export default appConfiguration;
