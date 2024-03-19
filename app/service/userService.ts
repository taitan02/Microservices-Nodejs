import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SuccessResponse, ErrorResponse } from "../utils/response";
import { UserRepository } from "../repository/userRepository";
import { autoInjectable } from "tsyringe";
import { plainToClass } from "class-transformer";
import { SignupInput } from "../models/dto/SignupInput";
import { AppValidationError } from "../utils/errors";
import { UserType } from "../models/UserModel";
import { getHashedPassword, getSalt, getToken, validatePassword, veriToken } from "../utils/password";
import "../utils/notification";
import { genAccessCode, sendVerificationCode } from "../utils/notification";
import { VerificationInput } from "../models/dto/VerifyInput";
import { timeDifference } from "../utils/dateHelper";
@autoInjectable()
export class UserService {
    repository: UserRepository
    constructor(repository: UserRepository) {
        this.repository = repository
    }
    async ResponseWithError (event: APIGatewayProxyEventV2) {
        return ErrorResponse(404, "requested method is not support")
    }
    // User create
    async CreateUser(event: APIGatewayProxyEventV2) {

        try {
            const input = plainToClass(SignupInput, event.body)
            const error = await AppValidationError(input)
            if (error) return ErrorResponse(400, error)
            
            const salt = await getSalt()
            const hashedPassword = await getHashedPassword(input.password, salt)
            const data = await this.repository.createAccount({
                email: input.email,
                password: hashedPassword,
                salt,
                phone: input.phone,
                user_type: UserType.BUYER
            })
    
            return SuccessResponse(data)
        } catch (error) {
            console.log(error)
            return ErrorResponse(500, error)
        }
    }

    async UserLogin(event: APIGatewayProxyEventV2) {
        try {
            const input = plainToClass(SignupInput, event.body)
            const error = await AppValidationError(input)
            if (error) return ErrorResponse(400, error)
            
            // const salt = await getSalt()
            // const hashedPassword = await getHashedPassword(input.password, salt)
            const data = await this.repository.findAccount(input.email)
            const verified = await validatePassword(input.password, data.password, data.salt)
            if (!verified) {
                throw new Error("password does not match")
            }
            const token = getToken(data);

            return SuccessResponse({ token })
        } catch (error) {
            console.log(error)
            return ErrorResponse(500, error)
        }
    }

    async GetVerificationToken(event: APIGatewayProxyEventV2) {
        const token = event.headers.authorization
        const payload = await veriToken(token.split(" ")[1])
        if (!payload) return ErrorResponse(401, "Unauthorized")
        const { code, expiry } = genAccessCode()
        console.log(code, expiry)

        await this.repository.updateVerificationCode(payload.user_id, expiry, code)


        // const response = await sendVerificationCode(code, payload.phone)
        return SuccessResponse({
            message: "verification code is sent"
        })
        
    }

    async VerifyUser(event: APIGatewayProxyEventV2) {

        const token = event.headers.authorization
        const payload = await veriToken(token.split(" ")[1])
        if (!payload) return ErrorResponse(401, "Unauthorized")

        const input = plainToClass(VerificationInput, event.body)
        const error = await AppValidationError(input)
        if (error) return ErrorResponse(400, error)

        const { verification_code, expiry } = await this.repository.findAccount(payload.email)
        console.log(verification_code, input.code)
        if (verification_code === parseInt(input.code)) {
            const currentDate = new Date()
            const diff = timeDifference(expiry, currentDate.toISOString(), "m")
            console.log("diff", diff)
            if (diff > 0) {
                await this.repository.updateVerifiedUser(payload.user_id)
            } else {
                return ErrorResponse(403, "verify code is expired")
            }
        } else {
            return ErrorResponse(400, "wrong verify code")
        }

        return SuccessResponse({message: "res post verify user"})
    }

    // User Profile

    async CreateProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message: "res create profile"})
    }

    async EditProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message: "res edit profile"})
    }

    async GetProfile(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message: "res get profile"})
    }

    // Cart

    async CreateCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message: "res create cart"})
    }

    async GetCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message: "res edit cart"})
    }
    
    async UpdateCart(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message: "res update cart"})
    }

    // Payment

    async CreatePaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message: "res create payment"})
    }

    async UpdatePaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message: "res update payment"})
    }

    async GetPaymentMethod(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message: "res get payment"})
    }
}