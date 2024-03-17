import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SuccessResponse, ErrorResponse } from "../utils/response";
import { UserRepository } from "../repository/userRepository";
import { autoInjectable } from "tsyringe";
import { plainToClass } from "class-transformer";
import { SignupInput } from "../models/dto/SignupInput";
import { AppValidationError } from "../utils/errors";
import { UserType } from "../models/UserModel";
import { GetHashedPassword, GetSalt, ValidatePassword } from "../utils/password";

@autoInjectable()
export class UserService {
    repository: UserRepository
    constructor(repository: UserRepository) {
        this.repository = repository
    }
    
    // User create
    async CreateUser(event: APIGatewayProxyEventV2) {

        try {
            const input = plainToClass(SignupInput, event.body)
            const error = await AppValidationError(input)
            if (error) return ErrorResponse(400, error)
            
            const salt = await GetSalt()
            const hashedPassword = await GetHashedPassword(input.password, salt)
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
            
            // const salt = await GetSalt()
            // const hashedPassword = await GetHashedPassword(input.password, salt)
            const data = await this.repository.findAccount(input.email)
            const verified = await ValidatePassword(input.password, data.password, data.salt)
            if (!verified) {
                throw new Error("password does not match")
            }
            return SuccessResponse(data)
        } catch (error) {
            console.log(error)
            return ErrorResponse(500, error)
        }
    }

    async UserVerify(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message: "res verify user"})
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