import type { Config } from 'drizzle-kit';
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default {
	schema: './src/db/schemas',
	out: './migrations',
	driver: 'turso',
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!,
	},
} satisfies Config;
