import postgres from "pg";
import envModule from "../app/config.mjs";
console.log(envModule);

export const pool = new postgres.Pool({
  user: envModule.pg_user,
  password: envModule.pg_password,
  host: envModule.pg_host,
  port: envModule.pg_port,
  database: envModule.pg_database,
});
