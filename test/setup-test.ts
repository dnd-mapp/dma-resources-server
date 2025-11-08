import { resetDatabases } from './mocks';

jest.mock('@prisma/adapter-mariadb');

resetDatabases();
