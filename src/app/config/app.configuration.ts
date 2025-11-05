import { DEFAULT_HOST, DEFAULT_PORT, EnvironmentVariableNames } from '../constants';
import { parsePort } from '../utils';

export interface AppConfiguration {
    host: string;
    port: number;
}

function appConfiguration() {
    return {
        app: {
            host: process.env[EnvironmentVariableNames.HOST] || DEFAULT_HOST,
            port: parsePort(process.env[EnvironmentVariableNames.PORT], DEFAULT_PORT),
        } satisfies AppConfiguration,
    };
}

export default appConfiguration;
