import { tryCatch } from './try-catch';

export function parsePort(value: string, fallback: number) {
    const { data: parsed, error: parsingError } = tryCatch(() => Number.parseInt(value));

    if (parsingError || Number.isNaN(parsed)) return fallback;
    return parsed;
}
