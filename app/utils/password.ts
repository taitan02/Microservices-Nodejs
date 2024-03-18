import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

import { UserModel } from "../models/UserModel";

const APP_SECRET = process.env.APP_SECRET

export const getSalt = () => {
    return bcrypt.genSalt()
}

export const getHashedPassword = (password: string, salt: string) => {
    return bcrypt.hash(password, salt)
}

export const validatePassword = async (
    enterPassword: string,
    savedPassword: string,
    salt: string
) => {
    return (await getHashedPassword(enterPassword, salt)) === savedPassword
}

export const getToken = ({user_id, email, phone, user_type}: UserModel) => {
    return jwt.sign({user_id, email, phone, user_type}, APP_SECRET, {expiresIn: "1d"})
}

export const veriToken = async (token: string): Promise<UserModel | false> => {
    try {
        if (token) {
            const payload = jwt.verify(token, APP_SECRET);
            return payload as UserModel
        }
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}

