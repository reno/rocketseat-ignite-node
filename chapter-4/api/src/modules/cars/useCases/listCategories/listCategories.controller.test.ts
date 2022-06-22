import { DataSource } from 'typeorm';
import request from 'supertest';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { app } from '@shared/infra/http/app';
import { AppDataSource } from '@shared/infra/database/data-source';

let connection: any;
describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await AppDataSource.initialize();
    await connection.runMigrations();

    const id = uuid();
    const password = await bcrypt.hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, is_admin, created_at, driver_license ) 
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it('Should be able to list all categories ', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { refresh_token } = responseToken.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const response = await request(app).get('/categories');
    console.log('LIST', response.body);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toEqual('Category Supertest');
  });
});