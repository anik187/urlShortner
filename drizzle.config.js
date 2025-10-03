import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dbCredentials: {
        url: process.env.DB_URL,
    },
    dialect: 'postgresql',
    schema: './models/',
    out: './drizzle'
})
