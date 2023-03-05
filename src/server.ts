import dotenv = require("dotenv");
import sql = require("mssql");
import { Config } from "./config"

dotenv.config();

class ConnectDatabase {
    private readonly sqlConfig: Config;

    constructor () {
        this.sqlConfig = new Config;
    }

    public async connection() {
        const LOG_NAME = "Database connection >> ";
        
        try {
            await sql.connect(this.sqlConfig.sqlConfig());
            const result = await sql.query`SELECT * FROM Persons`;
            console.dir(`${LOG_NAME} ${JSON.stringify(result.recordset)}`);
        } catch (err) {
            console.dir(`${LOG_NAME} ${err}`);
        }
    }
}

export {
    ConnectDatabase
}