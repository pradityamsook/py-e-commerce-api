import { Request, Response } from "express";
import { AuthenticateMapper } from "../mapper/authenticate.mapper";
import { AuthenticateService } from "../services/authenticate.service";

export class AuthenticateController {
    constructor (
        private readonly authenService: AuthenticateService = new AuthenticateService(),
        private readonly authenticateMapper: AuthenticateMapper = new AuthenticateMapper()
    ) {}
    
    public async login(req: Request, res: Response): Promise<any> {
        const authenMap: AuthenticateMapper = new AuthenticateMapper();
        const authenService: AuthenticateService = new AuthenticateService();
        console.log("AuthenticateController >> login : " + JSON.stringify(req.body));
        const { user, password } = req.body
        const reqUser = authenMap.mapperLogin(user, password);
        console.log(reqUser)
        try {
            if (!(user || password)) {
                return res.status(400).json({ 
                    success: false,
                    message: "Invalid username or password"
                })
            } 
            
            const result = await authenService.login(reqUser);
            
            if (result.rowsAffected[0] == 0) {
                return res.json({
                    succes: false,
                    message: "User logged in unsuccessfully because wrong query",
                })
            }

            return res.json({
                succes: true,
                message: "User logged in successfully",
                result: result.recordset
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `Internal Server Error: ${error}`
            });
        }  
    }

    public hello(req: Request, res: Response) {
        console.log("hello");
        res.status(200).json({
            success: true,
            message: "hello"
        });
    }
}