import { DBClient } from "../utils/databaseClient";
import { UserModel } from "../models/UserModel";
import { DBOperation } from "./dbOperation";

export class UserRepository extends DBOperation {
    constructor() {
        super();
    }

    async createAccount ({email, phone, salt, password, user_type}: UserModel) {
       const queryString = "INSERT INTO users(phone, email, password, salt, user_type) VALUES($1,$2,$3,$4,$5) RETURNING *"
       const values = [phone, email, password, salt, user_type]
       const result = await this.executeQuery(queryString, values)
       if (result.rowCount > 0) {
        return result.rows[0] as UserModel
       }
    }

    async findAccount (email: string) {
        const queryString = "SELECT user_id, phone, email, password, salt, expiry, verification_code FROM users WHERE email=$1"
        const values = [email]
        const result = await this.executeQuery(queryString, values)
        if (result.rowCount < 1) {
            throw new Error("user does not exist")
        }
        return result.rows[0] as UserModel
     }

     async updateVerificationCode (user_id: string, expiry: Date, code: number) {
        const queryString = "UPDATE users SET verification_code=$1, expiry=$2 WHERE user_id=$3 AND verified=FALSE RETURNING *"
        const values = [code, expiry, user_id]
        const result = await this.executeQuery(queryString, values)
        if (result.rowCount < 1) {
            throw new Error("user already verified")
        }
        return result.rows[0] as UserModel
     }

     
     async updateVerifiedUser (user_id: string) {
        const queryString = "UPDATE users SET verified=TRUE WHERE user_id=$1 AND verified=FALSE RETURNING *"
        const values = [user_id]
        const result = await this.executeQuery(queryString, values)
        if (result.rowCount < 1) {
            throw new Error("user already verified")
        }
        return result.rows[0] as UserModel
     }
}