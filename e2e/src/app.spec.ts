describe('AppController', () => {
    it('/ (GET)', async () => {
        const response = await fetch('http://localhost:3000/');
        const body = await response.text();

        expect(body).toEqual('Hello World!');
    });
});
