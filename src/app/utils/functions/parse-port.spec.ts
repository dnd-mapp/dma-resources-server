import { parsePort } from './parse-port';

describe('parsePort', () => {
    it('should use fallback when provided value is NaN', () => {
        expect(parsePort('', 3000)).toEqual(3000);
        expect(parsePort(null, 3000)).toEqual(3000);
        expect(parsePort(undefined, 3000)).toEqual(3000);
        expect(parsePort(false as unknown as string, 3000)).toEqual(3000);
        expect(parsePort(true as unknown as string, 3000)).toEqual(3000);
        expect(parsePort('Hello World!', 3000)).toEqual(3000);
        expect(parsePort({ message: 'Hello World!' } as unknown as string, 3000)).toEqual(3000);
    });

    it('should use fallback when provided value is NaN', () => {
        expect(parsePort('3001', 3000)).toEqual(3001);
    });
});
