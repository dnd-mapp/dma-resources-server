import { config } from '../../constants';

export function serverAddress() {
    const { host, port } = config;
    return `http://${host}:${port}/server`;
}
