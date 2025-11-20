import { sslEnabled } from '../../config';
import { DEFAULT_HOST, DEFAULT_PORT } from '../../constants';

let address = '';

export function serverAddress(host: string = DEFAULT_HOST, port: number = DEFAULT_PORT) {
    if (address) return address;

    if (sslEnabled()) address += 'https://';
    else address += 'http://';

    address += host;

    if (!((port === 443 && sslEnabled()) || (port === 80 && !sslEnabled()))) {
        address += `:${port}`;
    }
    return `${address}/server`;
}
