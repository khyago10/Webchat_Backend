export default interface IHashProviderInterface {
    generate(payload: string): Promise<string>;
    compare(payload: string, hash: string): Promise<boolean>;
}