export function parsePort(value: string, fallback: number) {
    const parsed = Number.parseInt(value);

    if (Number.isNaN(parsed)) return fallback;
    return parsed;
}
