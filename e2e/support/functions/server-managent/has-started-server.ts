import { config } from '../../constants';

export function hasStartedServer() {
    return Boolean(config.serverProcess);
}
