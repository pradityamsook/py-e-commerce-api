import dotenv = require("dotenv");
import SQL = require("mssql");
import { Config } from "../config/sql.config"
import { logger } from "./logger.util";

dotenv.config();

class ConnectDatabase {
    private readonly sqlConfig: Config;
    private readonly LOG_NAME: string = "Database connection >> "

    constructor() {
        this.sqlConfig = new Config;
    }

    public async connection(req: string): Promise<any> {

        try {
            await SQL.connect(this.sqlConfig.sqlConfig());
            const result = await SQL.query(req);
            logger.info(this.LOG_NAME, JSON.stringify(result.recordset));
            return result;
        } catch (err) {
            logger.error(`${this.LOG_NAME} ${err}`);
        }
    }
}

export {
    ConnectDatabase
}