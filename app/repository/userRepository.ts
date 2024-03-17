import { DBCLient } from "../utils/databaseClient";
import { UserModel } from "../models/UserModel";

export class UserRepository {
    constructor() {}

    async createAccount ({email, phone, salt, password, user_type}: UserModel) {
       const client = await DBCLient()
       client.connect()
       const queryString = "INSERT INTO users(phone, email, password, salt, user_type) VALUES($1,$2,$3,$4,$5) RETURNING *"
       const values = [phone, email, password, salt, user_type]
       const result = await client.query(queryString, values)
       await client.end()
       if (result.rowCount > 0) {
        return result.rows[0] as UserModel
       }
    }

    async findAccount (email: string) {
        const client = await DBCLient()
        client.connect()
        const queryString = "SELECT user_id, phone, email, password, salt FROM users WHERE email=$1"
        const values = [email]
        const result = await client.query(queryString, values)
        await client.end()
        console.log(result.rows[0])
        if (result.rowCount < 1) {
            throw new Error("user does not exist")
        }
        return result.rows[0] as UserModel
     }
}