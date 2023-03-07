import { ConnectDatabase } from "../../../utils/connect-db.util";
import { User } from "../interface/user.interface";


export class AuthenticateRepository {
    constructor (
        private readonly connect: ConnectDatabase = new ConnectDatabase()
    ) {}

    public async login(req: User): Promise<any> {
        const SELECT_USER = 
            `SELECT 
            Username as username, 
            Firstname as first_name, 
            Lastname as last_name, 
            Role as role 
            FROM users WHERE Username = 
            '${req.username}' AND Password = 
            '${req.password}'`.trim()
        ;
        console.log(SELECT_USER);
        const result = await this.connect.connection(SELECT_USER);
        
        console.log(result);

        return result;
    }
}