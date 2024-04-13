import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;
const SALT_VALUE = process.env.SALT_VALUE;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const NODE_MAILER_EMAIL = process.env.NODE_MAILER_EMAIL;
const NODE_MAILER_PASSWORD = process.env.NODE_MAILER_PASSWORD;
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;

export default {
    PORT,
    DB_URI,
    SALT_VALUE,
    JWT_SECRET_KEY,
    NODE_MAILER_EMAIL,
    NODE_MAILER_PASSWORD,
    CLOUDINARY_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET_KEY,
};
