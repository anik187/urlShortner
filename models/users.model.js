import { pgTable, unique, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    firstName: varchar("first_name", { length: 55 }).notNull(),
    lastName: varchar("last_name", { length: 55 }),
    email: varchar({ length: 255 }).notNull(),
    password: text().notNull(),
    salt: text().notNull(),
    createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: 'string' }).$onUpdate(() => new Date()),
}, (table) => [
    unique("users_email_unique").on(table.email),
]);