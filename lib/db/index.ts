import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);

/**
 * Perform database operation through drizzle
 */
export const db = drizzle(sql,{schema})

/**
 * Use raw SQL through neon serverlesss
 */
export {sql}