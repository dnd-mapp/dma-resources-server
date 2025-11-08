import { ConfigModuleOptions } from '@nestjs/config';
import appConfiguration from './app.configuration';
import { validateEnvVariables } from './environment.validation';

export const configModuleOptions: ConfigModuleOptions = {
    cache: true,
    expandVariables: true,
    load: [appConfiguration],
    validate: validateEnvVariables,
};
