import { tryCatch } from './try-catch';

export function parsePort(value: string, fallback: number) {
    const { data: parsed, error: parseError } = tryCatch(() => Number.parseInt(value));

    if (parseError) {
        console.error(parseError);
        return fallback;
    }
    if (Number.isNaN(parsed)) return fallback;
    return parsed;
}
