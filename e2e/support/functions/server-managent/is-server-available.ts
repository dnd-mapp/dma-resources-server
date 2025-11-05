import { delay, serverAddress } from '../utils';

export async function isServerAvailable() {
    const abortController = new AbortController();

    const request = fetch(`${serverAddress()}/health`, { signal: abortController.signal });
    const response = await Promise.race([request, delay(1000)]);

    if (response instanceof Response) {
        return response.status === 200;
    }
    abortController.abort('Request timed out');
    return false;
}
