export let isSslEnabled = false;

export function resetSslConfiguration() {
    isSslEnabled = false;
}

export function enableSsl() {
    isSslEnabled = true;
}
