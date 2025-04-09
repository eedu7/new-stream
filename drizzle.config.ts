import { defineConfig } from "drizzle-kit";
import { configDotenv } from "dotenv";

configDotenv({
    path: ".env.local",
});

export default defineConfig({
    out: "./drizzle",
    schema: "./src/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
