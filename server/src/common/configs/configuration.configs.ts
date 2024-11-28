import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    dialect: process.env.DATABASE_DIALECT || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'fenRFgdSWrf',
    database: process.env.DATABASE_NAME || 'U_PROJECT_STUDIO',
  },
  cache: {
    host: process.env.CACHE_HOST || 'localhost',
    port: parseInt(process.env.CACHE_PORT) || 6379,
    ttL: parseInt(process.env.CACHE_TTL) || 10,
  },
  tokens: {
    access_secret: process.env.ACCESS_SECRET,
  },
});
