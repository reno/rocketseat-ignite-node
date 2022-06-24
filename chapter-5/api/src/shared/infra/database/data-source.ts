import { DataSource } from 'typeorm'

const AppDataSource = new DataSource({
  host: 'database',
  type: 'postgres',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: process.env.NODE_ENV === "test" ? "ignite-test" : "ignite",
  logging: false,
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  subscribers: [],
  migrations: ['./src/shared/infra/database/migrations/*.ts'],
})

export function createConnection(host: string): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export { AppDataSource };
