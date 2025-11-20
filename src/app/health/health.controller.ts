import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { DatabaseService } from '../database';
import { tryCatchAsync } from '../utils';
import { HealthStatuses, RunningStatuses, StatusDto } from './status.dto';

@Controller('/health')
export class HealthController {
    private readonly databaseService: DatabaseService;

    public constructor(databaseService: DatabaseService) {
        this.databaseService = databaseService;
    }

    /**
     * Liveness: Confirms that the app is running.
     */
    @Get('/live')
    public live() {
        return new StatusDto(HealthStatuses.OK);
    }

    /**
     * Readiness: Confirms that the database (and other dependencies) are working.
     */
    @Get('/ready')
    public async ready() {
        const { error } = await tryCatchAsync(this.databaseService.testDatabaseConnection());

        const status = new StatusDto(HealthStatuses.OK);

        if (error) {
            status.status = HealthStatuses.UNHEALTHY;
            status.setCheck('database', RunningStatuses.DOWN, error.message);

            throw new ServiceUnavailableException(status);
        }
        status.setCheck('database', RunningStatuses.UP);

        return status;
    }
}
