import { resetMocks } from './mocks';

jest.mock('@prisma/adapter-mariadb');

beforeEach(() => {
    resetMocks();
});
