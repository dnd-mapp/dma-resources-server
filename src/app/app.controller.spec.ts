import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';

describe('AppController', () => {
    async function setupTest() {
        const app = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        return {
            controller: app.get(AppController),
        };
    }

    it('should return "Hello World!"', async () => {
        const { controller } = await setupTest();
        expect(controller.getHello()).toBe('Hello World!');
    });
});
