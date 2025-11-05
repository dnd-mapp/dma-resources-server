import { serverAddress, ServerMessage } from '../support';

describe('Health check', () => {
    it('should return health check', async () => {
        const response = await fetch(`${serverAddress()}/health`);
        const body = (await response.json()) as ServerMessage;

        expect(response.status).toBe(200);
        expect(body).toEqual({ message: 'Healthy' });
    });
});
