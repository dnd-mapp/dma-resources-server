import { tryCatch } from './try-catch';

export async function isServerRunning(url: string) {
    const { error } = await tryCatch(fetch(url));

    if (
        error &&
        'cause' in error &&
        typeof error.cause === 'object' &&
        error.cause &&
        'code' in error.cause &&
        error.cause.code === 'ECONNREFUSED'
    ) {
        return false;
    }
    if (error) throw error;
    return true;
}
