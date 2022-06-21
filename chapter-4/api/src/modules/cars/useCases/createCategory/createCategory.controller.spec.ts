import request from 'supertest';
import { DataSource } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { app } from '@shared/infra/http/app';
//import createConnection from '@shared/infra/typeorm';
import { TestDataSource } from '@shared/infra/database/data-source';

//let connection: Connection;
let connection: DataSource;
describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await TestDataSource.initialize();
    //connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await bcrypt.hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, 'isAdmin', created_at, driver_license ) 
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@mail.com',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create a new category with duplicated name', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@mail.com',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(400);
  });
});