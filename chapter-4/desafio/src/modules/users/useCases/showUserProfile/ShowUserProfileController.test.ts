import { app } from '../../../../app';
import request from 'supertest';
import createConnection from '../../../../database';
import { Connection } from 'typeorm';

let connection: Connection;
describe('Show user profile controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should to retrieve an user profile', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        name: 'Test user',
        email: 'test@mail.com',
        password: 'p4ssw0rd',
      });

    const session = await request(app).post('/api/v1/sessions').send({
      email: 'test@mail.com',
      password: 'p4ssw0rd'
    });

    const profile = await request(app).get('/api/v1/profile').set({
      authorization: `Bearer ${session.body.token}`,
    });

    expect(profile.body.name).toEqual('Test user');
  });
});