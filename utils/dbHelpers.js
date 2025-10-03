import {usersTable} from "../models/users.model.js";
import {db} from "../db/index.js";
import {and, eq} from "drizzle-orm";
import {urlsTable} from "../models/urls.model.js";

export const getUserByEmail = async (email) => {
        const [existingUser] = await db.select({
            id: usersTable.id,
            password: usersTable.password ,
            salt: usersTable.salt
        }).from(usersTable).where(eq(usersTable.email,email))
        return existingUser;
}

export const insertUser = async (user) => {
    const [newUser] = await db.insert(usersTable).values({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.hashedPassword,
        salt: user.generatedSalt
    }).returning({id: usersTable.id, email: usersTable.email, salt: usersTable.salt})
    return newUser;
}

// Url table functions

export const getAllUrlByUserId = async (userId) => {
    const urls =  await db.select({
        longUrl: urlsTable.longUrl,
        shortCode: urlsTable.shortCode
    }).from(urlsTable).where(eq(urlsTable.userId, userId));
    return urls;
}


export const insertUrl = async (longUrl, shortCode,userId) => {
    const [newUrlMapping] = await db.insert(urlsTable).values({
        shortCode,
        longUrl,
        userId
    }).returning({shortCode:urlsTable.shortCode,longUrl:urlsTable.longUrl});
    return newUrlMapping;
}

export const getUrlByShortCode = async (shortCode,userId) => {
    const [url] = await db.select().from(urlsTable)
            .where(and(
                eq(urlsTable.shortCode, shortCode),
                eq(urlsTable.userId, userId)
                ));
    return url;
}

export const visitUrlByShortCode = async (shortCode) => {
    const [url] = await db.select({longUrl: urlsTable.longUrl}).from(urlsTable)
        .where(
            eq(urlsTable.shortCode, shortCode)
        );
    return url;
}

export const updateLongUrl = async (longUrl, shortCode) => {
    const [result] = await db.update(urlsTable).set({longUrl}).where(eq(urlsTable.shortCode, shortCode)).returning({updatedUrl: urlsTable.longUrl})
    return result
}

export const deleteShortCode = async (shortCode,userId) => {
    await db.delete(urlsTable)
        .where(and(
            eq(urlsTable.shortCode, shortCode),
            eq(urlsTable.userId, userId)
        ))
}