import { sign, verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import TokenPayload from '../models/TokenPayload';
import IAuthSessionProvider from '../models/IAuthSessionProvider';
import usersRouter from '@modules/users/infra/http/routes/users.routes';


export default class JWTAuthSessionProvider implements IAuthSessionProvider{
    public async generateToken(userId: string): Promise<string> {
        const token = await sign({}, authConfig.jwt.secret, {
            subject: userId,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return token;
    }

    public verifyToken(token: string, secret: string): TokenPayload {
        const decoded =  verify(token, secret) as TokenPayload;        

        return decoded;
    }

}