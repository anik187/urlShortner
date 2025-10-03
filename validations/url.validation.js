import * as z from 'zod'

export const createShortUrlPostBodySchema = z.object({
    longUrl: z.url(),
    shortCode: z.string().length(6).optional(),
})

export const updateLongUrlPostBodySchema = z.object({
    longUrl: z.url(),
    shortCode: z.string().length(6),
})