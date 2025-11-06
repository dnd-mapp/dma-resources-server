import { ClassConstructor, ClassTransformOptions, plainToInstance } from 'class-transformer';

export const transformOptions: ClassTransformOptions = {
    enableCircularCheck: true,
    enableImplicitConversion: true,
};

export function createInstance<T>(value: unknown, type: ClassConstructor<T>): T {
    return plainToInstance(type, value, transformOptions);
}

export function createInstances<T>(values: unknown[], type: ClassConstructor<T>): T[] {
    return plainToInstance(type, values, transformOptions);
}
