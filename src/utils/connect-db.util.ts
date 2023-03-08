import dotenv = require("dotenv");
import SQL = require("mssql");
import { Config } from "../config/sql.config"
import { logger } from "./logger.util";

dotenv.config();

class ConnectDatabase {
    private readonly sqlConfig: Config;

    constructor () {
        this.sqlConfig = new Config;
    }

    public async connection(req: string): Promise<any> {
        const LOG_NAME = "Database connection >> ";
        
        try {
            await SQL.connect(this.sqlConfig.sqlConfig());
            const result = await SQL.query(req);
            logger.info(LOG_NAME + result.recordset);
            return result;
        } catch (err) {
            logger.error(`${LOG_NAME} ${err}`);
        }
    }
}

export {
    ConnectDatabase
}