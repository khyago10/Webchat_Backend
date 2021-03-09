import { injectable, inject } from 'tsyringe';

import IAuthSessionProvider from '../providers/AuthSessionProvider/models/IAuthSessionProvider';
import authConfig from '@config/auth';


interface IRequest {
    email: string;
    password: string;    
}

interface IUserID {
    id: string;    
}

@injectable()
class CreateUserService {
    constructor(       
        @inject('AuthSessionProvider')
        private authSessionProvider: IAuthSessionProvider,
    ) {}

    public execute(token : string): IUserID {
        
        const decoded = this.authSessionProvider.verifyToken(token, authConfig.jwt.secret);

        const { sub } = decoded;

        return {
            id: sub
        };
    }
}

export default CreateUserService;