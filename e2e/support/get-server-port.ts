export function getServerPort(fallback: number) {
    const portEnv = Number.parseInt(process.env['PORT'] || `${fallback}`);

    if (Number.isNaN(portEnv)) return fallback;
    return portEnv;
}
