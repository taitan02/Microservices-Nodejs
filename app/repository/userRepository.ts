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
       if (result.rowCount > 0) {
        return result.rows[0] as UserModel
       }
    }
}