export async function delay(delayTimeMs: number) {
    return new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            resolve();
        }, delayTimeMs);
    });
}
