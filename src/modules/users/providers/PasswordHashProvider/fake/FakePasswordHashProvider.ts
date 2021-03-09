import IPasswordHashProvider from '../models/IPasswordHashProvider';

export default class FakePasswordHashProvider {
    public async generate(payload: string): Promise<string> {
        return payload;
    }

    public async compare(payload: string, hash: string): Promise<boolean> {
        return payload === hash;
    }
}