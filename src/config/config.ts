import dotenv from 'dotenv'

dotenv.config()

if (!process.env.PORT || !process.env.NODE_ENV || !process.env.JWT_SECRET || !process.env.DATABASE_URL || !process.env.JWT_REFRESH_SECRET || !process.env.CLIENT_URL) {
    throw new Error('Faltan variables de entorno requeridas')
}

export const config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173"
}