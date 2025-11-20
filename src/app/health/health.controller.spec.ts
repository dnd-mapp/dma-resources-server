import { createTestEnvironment, withMockedQuery } from '@dnd-mapp/dma-resources-server/test';
import { ServiceUnavailableException } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthModule } from './health.module';

describe('HealthController', () => {
    interface SetupTestParams {
        databaseAvailable: boolean;
    }

    async function setupTest(params: SetupTestParams = { databaseAvailable: true }) {
        if (params.databaseAvailable) {
            withMockedQuery('SELECT 1;', () => 1);
        } else {
            withMockedQuery('SELECT 1;', () => new Error('Database unavailable'));
        }

        const app = await createTestEnvironment({
            imports: [HealthModule],
        });

        return {
            controller: app.get(HealthController),
        };
    }

    it('should return live check', async () => {
        const { controller } = await setupTest();

        expect(controller.live()).toEqual({ status: 'ok' });
    });

    it('should return ready check', async () => {
        const { controller } = await setupTest();

        expect(await controller.ready()).toEqual({ status: 'ok', checks: { database: 'up' } });
    });

    it('should return ready check when database is unavailable', async () => {
        const { controller } = await setupTest({ databaseAvailable: false });

        await expect(controller.ready()).rejects.toEqual(
            new ServiceUnavailableException({ status: 'unhealthy', checks: { database: 'down' } }),
        );
    });
});
