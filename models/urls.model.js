import {pgTable, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {usersTable} from "./users.model.js";

export const urlsTable = pgTable('urls',{
    id: uuid().primaryKey().defaultRandom(),
    shortCode: varchar("short_code",{length: 6}).notNull().unique(),
    longUrl: varchar("long_url",{length: 255}).notNull(),
    userId: uuid("user_id").references(() => usersTable.id).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
})