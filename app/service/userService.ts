import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SuccessResponse, ErrorResponse } from "../utils/response";
import { UserRepository } from "../repository/userRepository";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class UserService {
    repository: UserRepository
    constructor(repository: UserRepository) {
        this.repository = repository
    }
    
    // User create
    async CreateUser(event: APIGatewayProxyEventV2) {
        const body = event.body

        await this.repository.CreateUserOperation()

        return SuccessResponse({message: "res create user"})
    }

    async UserLogin(event: APIGatewayProxyEventV2) {
        return SuccessResponse({message: "res login user"})
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