export interface typeConfig {
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

class Config {
    sqlConfig() {
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
        } as typeConfig;
    
        return config;   
    }
}

export {
    Config
}