import request from 'supertest';
import { application } from '@infrastructure/api/Microservice';

const server = request(application);

describe('Testing App Request', () => {
    it('debería retornar 404', async (done) => {
        const response = await server.get('/');
        expect(response.status).toBe(404);
        done();
    });
});
