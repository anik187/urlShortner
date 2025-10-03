import {verifyToken} from "../utils/token.js";

/**
 * @param { import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * /*
 */
export const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)  return next()
    if(!authHeader.startsWith('Bearer')) {
        return res.status(401).send('Not authorized');
    }
    const token = authHeader.replace('Bearer ','');
    req.user = await verifyToken(token)
    next()
}

/**
 * @param { import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * /*
 */
export const ensureAuthenticated = (req, res, next) => {
    if (!req.user || !req.user?.id) {
        return res.status(401).send({error: "Not authorized"});
    }
    next()
}

