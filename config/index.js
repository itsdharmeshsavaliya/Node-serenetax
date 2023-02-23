import dotenv from 'dotenv';
dotenv.config();

export const {
    APP_PORT,
    APP_URL,
    DEBUG_MODE,
    JWT_SECRET,
    REFRESH_SECRET,
    SALT_FACTOR,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASS
} = process.env;