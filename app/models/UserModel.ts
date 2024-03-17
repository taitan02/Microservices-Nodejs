export interface UserModel {
    user_id?: string,
    email: string,
    password: string,
    salt: string,
    phone: string,
    user_type: "BUYER" | "SELLER"
}

export enum UserType {
    BUYER = "BUYER",
    SELLER = "SELLER"
}