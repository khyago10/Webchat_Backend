import { hash, compare } from 'bcryptjs';
import IPasswordHashProvider from '../models/IPasswordHashProvider';

export default class BCryptHashProvider implements IPasswordHashProvider {
    public async generate(payload: string): Promise<string> {
        const hashedPassword = await hash(payload, 8);

        return hashedPassword;        
    }
    
    public async compare(payload: string, hash: string): Promise<boolean> {
        const hashedPassword = await compare(payload, hash)

        return hashedPassword;        
    }

}