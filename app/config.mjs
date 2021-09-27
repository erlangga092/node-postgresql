import dotenv from "dotenv";

dotenv.config();

const envModule = {
  pg_user: process.env.PG_USER,
  pg_password: process.env.PG_PASS,
  pg_host: process.env.PG_HOST,
  pg_port: process.env.PG_PORT,
  pg_database: process.env.PG_DB,
};

export default envModule;
