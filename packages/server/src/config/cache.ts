import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';
  config: {
    redis: RedisOptions;
  };
}

const cacheConfig = {
  driver: 'redis',
  config: {
    redis: {
      host: 'localhost',
      port: 6379,
      password: undefined,
    },
  },
};
export default cacheConfig as ICacheConfig;
