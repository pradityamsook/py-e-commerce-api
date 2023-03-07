import { Request, Response } from "express";
import { User } from "../interface/user.interface";
import { AuthenticateRepository } from "../repository/authentivate.repository";

export class AuthenticateService {
    constructor (
        private readonly authenRepository: AuthenticateRepository = new AuthenticateRepository()
    ) {};

    public async login(req: User): Promise<any> {
        const result = await this.authenRepository.login(req);
        return result;
    }
}