export interface UserModel {
    user_id?: string,
    email: string,
    password: string,
    salt: string,
    phone: string,
    user_type: "BUYER" | "SELLER",
    first_name?: string,
    last_name?: string,
    profile_img?: string,
    verification_code?: number,
    expiry?: string,
    verified?: boolean,
}

export enum UserType {
    BUYER = "BUYER",
    SELLER = "SELLER"
}