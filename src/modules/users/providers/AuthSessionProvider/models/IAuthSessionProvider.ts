import TokenPayload from './TokenPayload';

export default interface IAuthSessionProvider {
    generateToken(userId: string): Promise<string>;
    verifyToken(token: string, secret: string): TokenPayload;
}