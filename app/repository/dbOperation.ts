import { DBClient } from "../utils/databaseClient";


export class DBOperation {
    constructor() {}

    async executeQuery(queryString: string, value: unknown[]) {
        const client = DBClient();
        await client.connect()
        const result = await client.query(queryString, value);
        await client.end()
        return result
    }
}