import { delay, tryCatchAsync } from '../utils';
import { isServerAvailable } from './is-server-available';

const MAX_RETRIES = 10;

const INITIAL_DELAY_MS = 3500;

const BASE_RETRY_DELAY_MS = 1000;

export async function waitForServerAvailable() {
    await delay(INITIAL_DELAY_MS);

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        await delay(BASE_RETRY_DELAY_MS * attempt);

        const { data: serverIsAvailable, error } = await tryCatchAsync(isServerAvailable());

        if (error || !serverIsAvailable) continue;
        break;
    }
}
