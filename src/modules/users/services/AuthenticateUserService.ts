import { injectable, inject } from 'tsyringe';

import IAuthSessionProvider from '../providers/AuthSessionProvider/models/IAuthSessionProvider';
import IPasswordHashProvider from '../providers/PasswordHashProvider/models/IPasswordHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/schemas/User';
import AppError from '@shared/errors/AppError';


interface IRequest {
    email: string;
    password: string;    
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('PasswordHashProvider')
        private passwordHashProvider: IPasswordHashProvider,

        @inject('AuthSessionProvider')
        private authSessionProvider: IAuthSessionProvider,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user)
            throw new AppError('Incorrect email or password', 401);

        const passwordMatched = await this.passwordHashProvider.compare(password, user.password);        
        
        if(!passwordMatched)
            throw new AppError('Incorrect email or password', 401);

        const token = await this.authSessionProvider.generateToken(user.id.toString());

        //delete user.password;

        return {
            user,
            token
        };
    }
}

export default CreateUserService;