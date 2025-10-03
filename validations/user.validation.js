import * as z from 'zod'

export const createUserPostBodySchema = z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    email: z.email(),
    password: z.string().min(3)
})

export const loginUserPostBodySchema = z.object({
    email: z.email(),
    password: z.string().min(3),
})