/**
 * @template T
 * @param fn {() => T}
 * @returns {{ data: T, error: null } | { data: null, error: Error }}
 */
function tryCatch(fn) {
    try {
        return { data: fn(), error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}

/**
 * @template T
 * @param promise {Promise<T>}
 * @returns {Promise<{ data: T, error: null } | { data: null, error: Error }>}
 */
async function tryCatchAsync(promise) {
    try {
        return { data: await promise, error: null };
    } catch (error) {
        return { data: null, error: error };
    }
}

/**
 * @param port {string}
 * @param fallback {number}
 * @returns {number}
 */
function parsePort(port, fallback) {
    const { data: parsed, error } = tryCatch(() => Number.parseInt(port));

    if (error) {
        console.error(error);
        return fallback;
    }
    if (Number.isNaN(parsed)) {
        console.warn(`"${port}" is an invalid port value.`);
        return fallback;
    }
    return parsed;
}

async function healthCheck() {
    const port = parsePort(process.env['DMA_PORT'], 3000);

    const { data: response, error: fetchError } = await tryCatchAsync(fetch(`http://localhost:${port}/server/health`));

    if (fetchError) {
        console.error(fetchError);
        process.exitCode = 1;
        return;
    }

    /**
     * @type {{ message: string }}
     */
    const { data: body, error: parseError } = await tryCatchAsync(response.json());

    if (parseError) {
        console.error('Failed to parse response body into valid JSON');
        console.error(parseError);
        process.exitCode = 1;
        return;
    }
    if (response.status !== 200) {
        console.error(body.message);
        process.exitCode = 1;
    }
}

healthCheck().catch((error) => console.error(error));
