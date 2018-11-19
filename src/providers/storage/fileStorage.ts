export default interface IFileStorage {
    writeFile(content, path): Promise<object>;
    readFile(path): Promise<object>;
}