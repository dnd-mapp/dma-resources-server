import { Test } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthModule } from './health.module';

describe('HealthController', () => {
    async function setupTest() {
        const app = await Test.createTestingModule({
            imports: [HealthModule],
        }).compile();

        return {
            controller: app.get(HealthController),
        };
    }

    it('should return health check', async () => {
        const { controller } = await setupTest();
        expect(controller.check()).toEqual({ message: 'Healthy' });
    });
});
