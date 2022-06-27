import { app } from '../../../../app';
import request from 'supertest';
import createConnection from '../../../../database';
import { Connection } from 'typeorm';

let connection: Connection;
describe('Get balance controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to get the balance', async () => {
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

    await request(app).post('/api/v1/statements/deposit')
      .send({
        amount: 100,
        description: 'deposit test'
      })
      .set({ authorization: `Bearer ${session.body.token}`, })

    const response = await request(app).get('/api/v1/statements/balance').set({ authorization: `Bearer ${session.body.token}`, });

    expect(response.body.balance).toEqual(100);
    expect(response.body.statement.length).toEqual(1);
  });
});