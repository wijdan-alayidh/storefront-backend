import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  ENV,
  POSTGREST_HOST,
  POSTGREST_DB_DEV,
  POSTGREST_USER,
  POSTGREST_PASSWORD,
  POSTGREST_DB_TEST,
} = process.env;

let Client: any;

if (ENV === "test") {
  Client = new Pool({
    host: POSTGREST_HOST,
    database: POSTGREST_DB_TEST,
    user: POSTGREST_USER,
    password: POSTGREST_PASSWORD,
  });
}

if (ENV === "dev") {
  Client = new Pool({
    host: POSTGREST_HOST,
    database: POSTGREST_DB_DEV,
    user: POSTGREST_USER,
    password: POSTGREST_PASSWORD,
  });
}

export default Client;
