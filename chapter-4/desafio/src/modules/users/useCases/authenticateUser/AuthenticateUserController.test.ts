import { app } from '../../../../app';
import request from 'supertest';
import createConnection from '../../../../database';
import { Connection } from 'typeorm';

let connection: Connection;
describe('Authenticate user controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to authenticate an user', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'Test user',
        email: 'test@mail.com',
        password: 'p4ssw0rd',
      });

    const response = await request(app).post('/api/v1/sessions').send({
      email: 'test@mail.com',
      password: 'p4ssw0rd'
    });

    expect(response.body.user.name).toEqual('Test user');
    expect(response.body).toHaveProperty('token');
  });
});