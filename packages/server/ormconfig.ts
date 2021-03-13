export default [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.ORM_HOST,
    port: process.env.ORM_PORT,
    username: process.env.ORM_USERNAME,
    password: process.env.ORM_PASSWORD,
    database: process.env.ORM_DATABASE,
    entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    cli: {
      migrationsDir: './src/shared/infra/typeorm/migrations',
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: process.env.ORM2_HOST,
    port: process.env.ORM2_PORT,
    database: process.env.ORM2_DATABASE,
    useUnifiedTopology: true,
    entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
  },
];
