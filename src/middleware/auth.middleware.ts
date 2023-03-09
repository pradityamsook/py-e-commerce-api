import jwt = require("jsonwebtoken");
import { NextFunction, Request, Response} from "express";
import { config } from "../config/jwt.config";


class MiddlewareAuthen {
    public checkJwt(req: Request, res: Response, next: NextFunction) {
        const token: string = <string>req.headers["authorization"];
        let jwtPayload: any;

        try {
            jwtPayload = <any>jwt.verify(token, config.jwtSecret);
            res.locals.jwtPayload = jwtPayload;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "wrong token"
            });
        }

        const { userId, username } = jwtPayload;
        const newToken = jwt.sign(
            { 
                userId, 
                username 
            }, 
            config.jwtSecret,
            { 
                algorithm: 'RS256', 
                expiresIn: "7d"
            }
        )

        res.setHeader("token", newToken);
        next();

    }
}

