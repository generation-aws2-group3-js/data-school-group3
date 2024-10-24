export const HOST = process.env.DB_HOST || "localhost";
export const USER = process.env.DB_USER || "admin";
export const PASSWORD = process.env.DB_PASSWORD || "admin";
export const DB = process.env.DB_NAME || "data_school";
export const PORT = process.env.DB_PORT || 5432;
export const dialect = process.env.DB_DIALECT || "postgres";
export const pool = {
    max: parseInt(process.env.DB_POOL_MAX, 10) || 5,
    min: parseInt(process.env.DB_POOL_MIN, 10) || 0,
    acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10) || 30000,
    idle: parseInt(process.env.DB_POOL_IDLE, 10) || 10000
};
