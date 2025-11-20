export const HealthStatuses = {
    OK: 'ok',
    UNHEALTHY: 'unhealthy',
} as const;

type HealthStatus = (typeof HealthStatuses)[keyof typeof HealthStatuses];

export const RunningStatuses = {
    UP: 'up',
    DOWN: 'down',
} as const;

type RunningStatus = (typeof RunningStatuses)[keyof typeof RunningStatuses];

export class CheckDto {
    public status: RunningStatus;
    public error?: string;

    constructor(status: RunningStatus, error?: string) {
        this.status = status;

        if (error) {
            this.error = error;
        }
    }
}

export class StatusDto {
    public status: HealthStatus;

    public checks: Record<string, RunningStatus | CheckDto>;

    constructor(status: HealthStatus) {
        this.status = status;
    }

    public setCheck(name: string, status: RunningStatus, error?: string) {
        if (!this.checks) this.checks = {};
        this.checks[name] = new CheckDto(status, error);
    }
}
