"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBCLient = void 0;
const pg_1 = require("pg");
const DBCLient = () => {
    return new pg_1.Client({
        host: "127.0.0.1",
        user: "root",
        database: "user_service",
        password: "root",
        port: 5432
    });
};
exports.DBCLient = DBCLient;
//# sourceMappingURL=databaseClient.js.map