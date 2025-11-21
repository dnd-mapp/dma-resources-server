import { resetSslConfiguration } from './configuration';
import { resetDatabases } from './db';

export function resetMocks() {
    resetDatabases();
    resetSslConfiguration();
}
