import { tryCatch, tryCatchAsync } from './try-catch';

describe('tryCatch', () => {
    it('should return a value', () => {
        const { data, error } = tryCatch(() => 'Hello World!');

        expect(data).toEqual('Hello World!');
        expect(error).toEqual(null);
    });

    it('should return error', () => {
        const expectedError = new Error();
        const { data, error } = tryCatch(() => {
            throw expectedError;
        });

        expect(data).toEqual(null);
        expect(error).toEqual(expectedError);
    });

    it('should return a resolved value', async () => {
        const { data, error } = await tryCatchAsync(new Promise((resolve) => resolve('Hello World!')));

        expect(data).toEqual('Hello World!');
        expect(error).toEqual(null);
    });

    it('should return a rejected error', async () => {
        const expectedError = new Error();
        const { data, error } = await tryCatchAsync(new Promise((_, reject) => reject(expectedError)));

        expect(data).toEqual(null);
        expect(error).toEqual(expectedError);
    });
});
