import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export class DataSourceConfig {
  public static getOptions(config: ConfigService): DataSourceOptions {
    return {
      type: 'mysql',
      host: config.get('DB_HOST'),
      port: parseInt(config.get('DB_PORT')),
      username: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_SCHEMA'),
      entities: [config.get('DB_ENTITY_PATH')],
      synchronize: false,
      logging: config.get('NODE_ENV') === 'dev' ? true : false,
      timezone: 'Z',
    };
  }
}
