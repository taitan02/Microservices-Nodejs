import bcrypt from "bcrypt"

export const GetSalt = () => {
    return bcrypt.genSalt()
}

export const GetHashedPassword = (password: string, salt: string) => {
    return bcrypt.hash(password, salt)
}

export const ValidatePassword = async (
    enterPassword: string,
    savedPassword: string,
    salt: string
) => {
    return (await GetHashedPassword(enterPassword, salt)) === savedPassword
}