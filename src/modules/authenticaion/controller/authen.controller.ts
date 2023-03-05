import { Router, Request, Response } from "express";

class AuthenticateController {
    public async login(req: Request, res: Response): Promise<any> {
        console.log("AuthenticateController >> login : " + JSON.stringify(req.body));
        const { user, password } = req.body

        try {
            if (user != "admin" || password != "admin") {
                return res.status(400).json({ 
                    success: false,
                    message: "Invalid username or password"
                })
            } 

            return res.json({
                succes: true,
                message: "User logged in successfully",
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

export {
    AuthenticateController
}