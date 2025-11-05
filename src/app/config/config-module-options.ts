import { ConfigModuleOptions } from '@nestjs/config';
import appConfiguration from './app.configuration';

export const configModuleOptions: ConfigModuleOptions = {
    cache: true,
    expandVariables: true,
    isGlobal: true,
    load: [appConfiguration],
};
