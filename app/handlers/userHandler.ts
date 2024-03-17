import { APIGatewayProxyEventV2 } from "aws-lambda"
import { UserService } from "../service/userService"
import { ErrorResponse } from "../utils/response";
import bodyParser from "@middy/http-json-body-parser"
import middy from "@middy/core";
import { container } from "tsyringe";

const serrvice = container.resolve(UserService)

export const Signup = middy((event: APIGatewayProxyEventV2) => {
    console.log(event)
    return serrvice.CreateUser(event)

}).use(bodyParser());

export const Login = middy((event: APIGatewayProxyEventV2) => {
    return serrvice.UserLogin(event)
}).use(bodyParser())

export const Verify = async (event: APIGatewayProxyEventV2) => {
    return serrvice.UserVerify(event)

}

export const Profile = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase()
    if (httpMethod === "post") {
        return serrvice.CreateProfile(event)
    } else if (httpMethod === "put") {
        return serrvice.EditProfile(event)
    } else if (httpMethod === "get") {
        return serrvice.GetProfile(event)
    } else {
        return ErrorResponse(404, "method is not supported")
    }
}

export const Cart = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase()
    if (httpMethod === "post") {
        return serrvice.CreateCart(event)
    } else if (httpMethod === "put") {
        return serrvice.UpdateCart(event)
    } else if (httpMethod === "get") {
        return serrvice.GetCart(event)
    } else {
        return ErrorResponse(404, "method is not supported")
    }
}

export const Payment = async (event: APIGatewayProxyEventV2) => {
    const httpMethod = event.requestContext.http.method.toLowerCase()
    if (httpMethod === "post") {
        return serrvice.CreatePaymentMethod(event)
    } else if (httpMethod === "put") {
        return serrvice.UpdatePaymentMethod(event)
    } else if (httpMethod === "get") {
        return serrvice.GetPaymentMethod(event)
    } else {
        return ErrorResponse(404, "method is not supported")
    }
}

