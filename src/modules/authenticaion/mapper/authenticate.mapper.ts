import { IResult } from "mssql";
import { GetUser, User } from "../interface/user.interface";

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

    public mapperGetUserLogin(res: any): GetUser {
        let getUser: GetUser = {
           "username": res.Username,
           "first_name": res.FirstName,
           "last_name": res.LastName, 
           "role": res.Role
        } as GetUser;
        
        return getUser;
    }
}