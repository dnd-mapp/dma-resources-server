import { Injectable, LoggerService, LogLevel, Scope } from '@nestjs/common';

interface Log {
    timestamp: number;
    level: LogLevel;
    context: string;
    message: string;
    params: unknown[];
}

@Injectable({ scope: Scope.TRANSIENT })
export class InMemoryLogger implements LoggerService {
    public logs: Log[] = [];

    private context: string;

    public setContext(context: string) {
        this.context = context;
    }

    public verbose(message: string, ...optionalParams: unknown[]) {
        this.addLog('verbose', message, ...optionalParams);
    }

    public debug(message: string, ...optionalParams: unknown[]) {
        this.addLog('debug', message, ...optionalParams);
    }

    public log(message: string, ...optionalParams: unknown[]) {
        this.addLog('log', message, ...optionalParams);
    }

    public warn(message: string, ...optionalParams: unknown[]) {
        this.addLog('warn', message, ...optionalParams);
    }

    public error(message: string, ...optionalParams: unknown[]) {
        this.addLog('error', message, ...optionalParams);
    }

    public fatal(message: string, ...optionalParams: unknown[]) {
        this.addLog('fatal', message, ...optionalParams);
    }

    private addLog(level: LogLevel, message: string, ...optionalParams: unknown[]) {
        const log = {
            timestamp: new Date().getTime(),
            context: this.context,
            level: level,
            message: message,
            params: [...optionalParams],
        } satisfies Log;

        this.logs = [...this.logs, log];
    }
}
