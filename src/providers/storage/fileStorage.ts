export default interface IFileStorage {
    writeFile(sender, args): Promise<object>;
    readFile(sender, args): Promise<object>;
}