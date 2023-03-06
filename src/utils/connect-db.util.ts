import dotenv = require("dotenv");
import SQL = require("mssql");
import { Config } from "../config/sql.config"

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
            const result = await SQL.query`${req}`;
            SQL.pool.close();
            return result;
            // console.dir(`${LOG_NAME} ${JSON.stringify(result.recordset)}`);
        } catch (err) {
            console.dir(`${LOG_NAME} ${err}`);
        }
    }
}

export {
    ConnectDatabase
}