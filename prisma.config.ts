import { config } from '@dotenvx/dotenvx';
import { defineConfig } from 'prisma/config';

config({ quiet: true });

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
    engine: 'classic',
    datasource: {
        url: process.env['MARIADB_URL'],
        shadowDatabaseUrl: process.env['MARIADB_SHADOW_URL'],
    },
});
