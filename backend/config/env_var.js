import dotenv from "dotenv";
dotenv.config();
export const ENV_VARS = {
    PORT: process.env.PORT || 8080,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_HOST: process.env.DATABASE_HOST,
    JWT_SECRET: process.env.JWT_SECRET,
}