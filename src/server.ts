import * as dotenv from "dotenv";
import  * as sql from "mssql";
dotenv.config();

export async function connection() {
    const LOG_NAME = "Database connection >> ";
    const config = {
        user: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DB_NAME,
        server: 'localhost',
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    }
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT * FROM Persons`;
        console.dir(`${LOG_NAME} ${JSON.stringify(result)}`);
    } catch (err) {
        console.dir(`${LOG_NAME} ${err}`);
    }
}