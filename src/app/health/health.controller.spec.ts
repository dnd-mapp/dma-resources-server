import { createTestEnvironment, withMockedQuery } from '@dnd-mapp/dma-resources-server/test';
import { ServiceUnavailableException } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthModule } from './health.module';
import { HealthStatuses, RunningStatuses, StatusDto } from './status.dto';

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

        expect(controller.live()).toEqual(new StatusDto(HealthStatuses.OK));
    });

    it('should return ready check', async () => {
        const { controller } = await setupTest();
        const status = new StatusDto(HealthStatuses.OK);
        status.setCheck('database', RunningStatuses.UP);

        expect(await controller.ready()).toEqual(status);
    });

    it('should return ready check when database is unavailable', async () => {
        const { controller } = await setupTest({ databaseAvailable: false });
        const status = new StatusDto(HealthStatuses.OK);
        status.setCheck('database', RunningStatuses.DOWN, 'Reason why database is down');

        await expect(controller.ready()).rejects.toEqual(new ServiceUnavailableException(status));
    });
});
