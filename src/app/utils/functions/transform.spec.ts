import { createInstance, createInstances } from './transform';

describe('transform', () => {
    class Person {
        name: string;
        age: number;
        employed: boolean;
    }

    it('should create a single instance', () => {
        expect(createInstance({}, Person)).toBeInstanceOf(Person);
    });

    it('should create multiple instances', () => {
        const persons = createInstances([{}, {}], Person);

        for (const person of persons) {
            expect(person).toBeInstanceOf(Person);
        }
    });
});
