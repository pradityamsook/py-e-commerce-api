import { User } from "../interface/user.interface";

export class AuthenticateMapper {
    /**
     * mapperLogin
req: User : User    */
    public mapperLogin(username: string, password: string): User {
        let user: User = {
            "username": username,
            "password": password
        } as User;

        return user;
    }
}