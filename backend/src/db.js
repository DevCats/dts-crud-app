import pg from "pg";
import env from "dotenv";

env.config();

// Database connection settings as defined in .env
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_NAME,
    password: process.env.PG_PASS,
    port: process.env.PG_PORT,
});

db.connect();

db.on("error", err => {
    console.error("Unexpected error", err);
    process.exit(-1);
});

export const query = (text, params) => db.query(text, params);