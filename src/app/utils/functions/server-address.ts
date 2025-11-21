import { sslEnabled } from '../../config';
import { DEFAULT_HOST, DEFAULT_PORT } from '../../constants';

let address = `http://${DEFAULT_HOST}:${DEFAULT_PORT}/server`;

export function setServerAddress(host: string = DEFAULT_HOST, port: number = DEFAULT_PORT) {
    address = '';

    if (sslEnabled()) address += 'https://';
    else address += 'http://';

    address += host;

    if (!((port === 443 && sslEnabled()) || (port === 80 && !sslEnabled()))) {
        address += `:${port}`;
    }
    address += '/server';
}

export function getServerAddress(includeGlobalPrefix = true) {
    if (includeGlobalPrefix) return address;
    else return address.replace('/server', '');
}
