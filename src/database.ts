import { Connection, createConnection, ConnectionOptions } from 'typeorm';

import databaseConfig from './config/database.json';
import entities from './entity';

export const getConnection = async (): Promise<Connection> => {

  const ConnectionOptions: ConnectionOptions = {
    type: "mysql",
    database: databaseConfig.database,
    synchronize: databaseConfig.synchronize,
    timezone: databaseConfig.timezone,
    logging: databaseConfig.logging,
    entities,
    host: databaseConfig.host,
    port: databaseConfig.port,
    username: databaseConfig.username,
    password: databaseConfig.password,
    charset: databaseConfig.charset,
  };

  try {
    const connection = createConnection(ConnectionOptions);
    console.log('[DB] Connected');
    return connection;
  } catch (err) {
    console.log(err);
    console.log('[DB] Connection Error');
  }

}