import {
    createUserPostBodySchema,
    loginUserPostBodySchema,
} from "../validations/user.validation.js";
import prettifyError from "../utils/customError.js"
import {hashPassword} from "../utils/hashedPasswordAndSaltGenerator.js";
import {getUserByEmail, insertUser} from "../utils/dbHelpers.js";
import {generateToken} from "../utils/token.js";

export const createUser = async (req, res) =>{
    try {
        const validationResult = await createUserPostBodySchema.safeParseAsync(req.body)
        if (validationResult.error) {
            return res.status(400).json({error: prettifyError(validationResult.error)})
        }
        const {firstName, lastName, email, password} = validationResult.data
        const existingUser = await getUserByEmail(email)
        console.log("existing user:",existingUser,"   email:",email)
        if (existingUser) {
            return res.status(400).json({error: `User already with email ${email} already exists`})
        }
        const [generatedSalt, hashedPassword] = await hashPassword(password)
        const newUser = await insertUser({firstName, lastName, email, hashedPassword, generatedSalt})
        console.log(newUser)
        return res.status(201).json({message: `successfully added new user with email ${email}`})
    } catch (e) {
        return res.status(500).json({error: e?.message || e})
    }
}

export const loginUser = async (req, res) =>{
    try {
        const validationResult = await loginUserPostBodySchema.safeParseAsync(req.body)
        if (validationResult.error) {
            return res.status(400).json({error: prettifyError(validationResult.error)})
        }
        const {email, password} = validationResult.data
        const existingUser = await getUserByEmail(email)
        if(!existingUser){
            return res.status(401).json({error: `User with email ${email} does not exist`})
        }
        const userSalt = existingUser.salt
        const [_,hashedPassword] = await hashPassword(password,userSalt)
        if(hashedPassword !== existingUser.password){
            return res.status(401).json({error: `Incorrect password`})
        }
        const token = await generateToken({id:existingUser.id})
        return res.status(200).json({token})
    } catch (e) {
        res.status(500).json({error: e?.message || e})
    }
}

export const logOutUser = async (req, res) =>{
    req.user = null
    req.headers.authorization = null
    return res.status(200).json({message: `User logged out`})
}