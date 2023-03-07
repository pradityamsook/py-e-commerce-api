interface typeConfig {
    user: string;
    password: string;
    database: string;
    server: string;
    pool: {
        max: number;
        min: number;
        idleTimeoutMillis: number
    };
    options: {
        encrypt: boolean;
        trustServerCertificate: boolean;
    }
}


import dotenv = require("dotenv");

dotenv.config();


class Config {
    sqlConfig() {
        const config = {
            user: process.env.USER_NAME,
            password: process.env.PASSWORD,
            database: process.env.DB_NAME,
            server: process.env.SERVER?.toString(),
            pool: {
                max: 100000,
                min: 0,
                idleTimeoutMillis: 30000
            },
            options: {
                encrypt: true,
                trustServerCertificate: true
            }
        } as typeConfig;
    
        return config;   
    }
}

export {
    Config
}