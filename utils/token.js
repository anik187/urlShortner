import "dotenv/config";
import jwt from 'jsonwebtoken';
import * as z from 'zod';

const jwt_secret = process.env.JWT_SECRET;

export const generateToken = async payload => {
    const payloadSchema = z.object({
        id: z.string(),
    })
    const validationResult = await payloadSchema.safeParseAsync(payload)
    if(validationResult.error) {
        return null
    }
    return jwt.sign(payload, jwt_secret,{expiresIn: '3h'})
}

export const verifyToken = async token => {
    try {
        return jwt.verify(token, jwt_secret)
    } catch (error) {
        return null
    }
}