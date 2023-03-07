import { Request, Response } from "express";
import { User } from "../interface/user.interface";
import { AuthenticateMapper } from "../mapper/authenticate.mapper";
import { AuthenticateRepository } from "../repository/authentivate.repository";

export class AuthenticateService {
    constructor (
        private readonly authenRepository: AuthenticateRepository = new AuthenticateRepository(),
        private readonly authenMapper: AuthenticateMapper = new AuthenticateMapper()
    ) {};

    public async login(req: User): Promise<any> {
        let result = await this.authenRepository.login(req);

        return result;
    }
}