import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const quertString = process.env.DATABASE_URL as string
export const connection = postgres(quertString);

export  const db = drizzle(connection)