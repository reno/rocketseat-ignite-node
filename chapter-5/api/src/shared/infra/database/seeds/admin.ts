import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { AppDataSource } from '../data-source';

async function create() {
  await AppDataSource.initialize()
  const queryRunner = AppDataSource.createQueryRunner();
  const id = uuid()
  const password = await bcrypt.hash('admin', 8);
  await queryRunner.query(
    `INSERT INTO USERS(id, name, email, password, driver_license, is_admin)
    values('${id}', 'admin', 'admin@mail.com', '${password}', '12345678', true)
    `
  );
}

create().then(() => {
  console.log('Admin user created');
});