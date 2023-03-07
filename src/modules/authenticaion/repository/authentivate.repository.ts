import { ConnectDatabase } from "../../../utils/connect-db.util";
import { User } from "../interface/user.interface";


export class AuthenticateRepository {
    constructor (
        private readonly connect: ConnectDatabase = new ConnectDatabase()
    ) {}

    /**
     * login
req: User     */
    public async login(req: User): Promise<any> {
        const SELECT_USER = `SELECT * FROM users WHERE Username = '${req.username}' AND Password = '${req.password}'`;
        console.log(SELECT_USER);
        const result = await this.connect.connection(SELECT_USER);
        
        console.log(result);

        return result;
    }
}