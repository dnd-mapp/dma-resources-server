import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, validate } from 'class-validator';
import { EnvironmentVariableNames, MAX_PORT_RANGE, MIN_PORT_RANGE } from '../constants';
import { createInstance } from '../utils';

class EnvironmentVariables {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    [EnvironmentVariableNames.HOST]?: string;

    @Max(MAX_PORT_RANGE)
    @Min(MIN_PORT_RANGE)
    @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
    @IsOptional()
    [EnvironmentVariableNames.PORT]?: number;
}

export async function validateEnvVariables(envVariables: Record<string, unknown>) {
    const parsedVariables = createInstance(envVariables, EnvironmentVariables);
    const errors = await validate(parsedVariables, { skipMissingProperties: false });

    if (errors.length === 0) return parsedVariables;
    throw new Error(Object.values(errors[0].constraints)[0]);
}
