import { injectable, inject } from 'tsyringe';

import IPasswordHashProvider from '../providers/PasswordHashProvider/models/IPasswordHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/schemas/User';
import AppError from '@shared/errors/AppError';


interface IRequest {
    name: string;
    email: string;
    password: string;
    birthDate: Date;    
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('PasswordHashProvider')
        private passwordHashProvider: IPasswordHashProvider,
    ) {}

    public async execute({ name, email, password, birthDate }: IRequest): Promise<User> {
        const userExists = await this.usersRepository.findByEmail(email);

        if(userExists)
            throw new AppError('This email already exists');

        const hashedPassword = await this.passwordHashProvider.generate(password);        
        
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            birthDate
        });

        //delete user.password;

        return user;
    }
}

export default CreateUserService;