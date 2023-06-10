import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const configuration = () => ({
  db: {
    type: 'mysql',
    host: process.env[`DB_HOST_${process.env.MODE.toUpperCase()}`],
    port: parseInt(process.env[`DB_PORT_${process.env.MODE.toUpperCase()}`]),
    username: process.env[`DB_USER_${process.env.MODE.toUpperCase()}`],
    password: process.env[`DB_PASSWORD_${process.env.MODE.toUpperCase()}`],
    database: process.env[`DB_NAME_${process.env.MODE.toUpperCase()}`],
    namingStrategy: new SnakeNamingStrategy(),
    autoLoadEntities: true,
    logging:
      +process.env[`DB_LOG_QUERY_${process.env.MODE.toUpperCase()}`] == 1,
    bigNumberStrings: false,
    synchronize: true,
  },
});
