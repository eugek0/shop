import dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    dialect: 'postgres',
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    seederStorage: process.env.DB_SEEDER_STORAGE,
    seederStorageTableName: process.env.DB_SEEDER_STORAGE_TABLE,
    migrationStorageTableName: process.env.DB_MIGRATION_STORAGE_TABLE,
  },
  test: {
    dialect: 'postgres',
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    seederStorage: process.env.DB_SEEDER_STORAGE,
    seederStorageTableName: process.env.DB_SEEDER_STORAGE_TABLE,
    migrationStorageTableName: process.env.DB_MIGRATION_STORAGE_TABLE,
  },
  production: {
    dialect: 'postgres',
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    seederStorage: process.env.DB_SEEDER_STORAGE,
    seederStorageTableName: process.env.DB_SEEDER_STORAGE_TABLE,
    migrationStorageTableName: process.env.DB_MIGRATION_STORAGE_TABLE,
  },
};
