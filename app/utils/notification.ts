import twilio from "twilio"
import dotenv from "dotenv"
dotenv.config()

const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN
const phoneSender = process.env.TWILIO_PHONE

const client = twilio(accountSid, authToken)

export const genAccessCode = () => {
    const code = Math.floor(Math.random() * 900000 + 10000)
    let expiry = new Date()
    expiry.setTime(new Date().getTime() + 5 * 60 * 1000)
    return { code, expiry }
}

export const sendVerificationCode = async (
    code: number,
    toPhoneNumber: String
) => {
    const response = await client.messages.create({
        body: `Your verification code is ${code} and will be expire within 30 minutes`,
        from: phoneSender,
        to: toPhoneNumber.trim()
    })
    console.log(response)
    return response
}