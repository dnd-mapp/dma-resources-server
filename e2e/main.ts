import { config } from '@dotenvx/dotenvx';
import { readFile } from 'fs/promises';
import { createPool, Pool, PoolConnection } from 'mariadb';
import { exec, exit } from 'shelljs';
import { parsePort } from './support';

config();

const composeFilePath = 'e2e/compose.yml' as const;

const Setups = {
    FULL: 'full',
    HALF: 'half',
} as const;

type Setup = (typeof Setups)[keyof typeof Setups];

function setupValues() {
    return Object.values(Setups)
        .map((setup) => `'${setup}'`)
        .join(', ');
}

function validateE2ESetupVariable(): Setup {
    const setup = process.env['E2E_SETUP'] as Setup;

    if (!setup) {
        console.error(
            new Error(`\`E2E_SETUP\` environment variable needs to be one of possible values: [${setupValues()}]`),
        );
        exit(1);
    }
    console.log(`"E2E_SETUP" is set to: "${setup}"`);
    return setup;
}

async function executeQueries(mariadbPool: Pool) {
    let connection: PoolConnection;

    try {
        connection = await mariadbPool.getConnection();

        const databaseSchema = process.env['MARIADB_SCHEMA'];
        const databaseUsername = process.env['MARIADB_USERNAME'];

        await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseSchema};`);
        console.log(`Database schema "${databaseSchema}" created.`);

        await connection.query(
            `CREATE USER IF NOT EXISTS '${databaseUsername}'@'%' IDENTIFIED BY '${process.env['MARIADB_PASSWORD']}';`,
        );
        console.log(`User '${databaseUsername}' created.`);

        await connection.query(`GRANT ALL PRIVILEGES ON ${databaseSchema}.* TO '${databaseUsername}'@'%';`);
        await connection.query('FLUSH PRIVILEGES;');
        console.log(`Permissions granted to '${databaseUsername}' on '${databaseSchema}'`);
    } finally {
        await connection.release();
    }
    console.log('MariaDB setup complete.');
}

async function prepareDatabase() {
    console.log('Setting up MariaDB database...');

    const rootPassword = await readFile('e2e/root-password.txt', { encoding: 'utf8' });

    const mariadbPool = createPool({
        host: process.env['MARIADB_HOST'] || 'localhost',
        port: parsePort(process.env['MARIADB_PORT'], 3306),
        user: 'root',
        password: rootPassword,
        connectionLimit: 5,
    });

    await executeQueries(mariadbPool);

    console.log('Closing MariaDB connection pool...');
    await mariadbPool.end();
    console.log('MariaDB connection pool closed.');
}

async function spinUpDockerContainers(setup: Setup) {
    if (setup === Setups.FULL) {
        console.log('Running full E2E setup with Docker Compose...');

        const commandResult = exec(`docker compose -f ${composeFilePath} up -d`).code;

        if (commandResult !== 0) {
            throw new Error('Failed to start full Docker Compose setup.');
        }
        console.log('Docker Compose services started.');

        await prepareDatabase();
    }
    if (setup === Setups.HALF) {
        console.log('Running half E2E setup with Docker Compose...');

        const commandResult = exec(`docker compose -f ${composeFilePath} up -d dma-resources-server`).code;

        if (commandResult !== 0) {
            throw new Error('Failed to start dma-resources-server with Docker Compose.');
        }
        console.log('dma-resources-server container started.');
    }
}

function runE2ETests() {
    console.log('Running E2E tests...');

    const commandResult = exec('npm run e2e').code;

    if (commandResult !== 0) {
        throw new Error('E2E tests failed.');
    }
    console.log('E2E tests completed successfully.');
}

function cleanupDockerContainers() {
    console.log('Cleaning up Docker containers...');

    const commandResult = exec(`docker compose -f ${composeFilePath} down`).code;

    if (commandResult !== 0) {
        console.warn('Failed to clean up Docker containers.');
        return;
    }
    console.log('Docker containers have been cleaned up.');
}

async function main() {
    try {
        const setup = validateE2ESetupVariable();

        await spinUpDockerContainers(setup);
        runE2ETests();
    } catch (error) {
        console.error('An error occurred during E2E setup or testing.', error);
        exit(1);
    } finally {
        cleanupDockerContainers();
    }
}

main().catch((error) => console.error(error));
