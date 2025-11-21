import { enableSsl } from '@dnd-mapp/dma-resources-server/test';
import { DEFAULT_HOST } from '../../constants';
import { getServerAddress, setServerAddress } from './server-address';

jest.mock('../../config/app.configuration');

describe('serverAddress', () => {
    it('should return the server address', () => {
        setServerAddress();

        expect(getServerAddress()).toEqual('http://localhost:3000/server');
        expect(getServerAddress(false)).toEqual('http://localhost:3000');
    });

    it('should return the server address with SSL enabled', () => {
        enableSsl();
        setServerAddress();

        expect(getServerAddress()).toEqual('https://localhost:3000/server');
    });

    it('should not include the default port for https', () => {
        enableSsl();
        setServerAddress(DEFAULT_HOST, 443);

        expect(getServerAddress()).toEqual('https://localhost/server');
    });

    it('should not include the default port for http', () => {
        setServerAddress(DEFAULT_HOST, 80);

        expect(getServerAddress()).toEqual('http://localhost/server');
    });
});
