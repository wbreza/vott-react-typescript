import IFileStorage from './fileStorage';
import fs from 'fs';
import path from 'path';
import { isBuffer } from 'util';

export class LocalFileSystem implements IFileStorage {
    constructor() { }

    writeFile(sender, args) {
        return new Promise((resolve, reject) => {
            const filePath = path.join(process.cwd(), args.path);
            fs.writeFile(filePath, args.content, function (error) {
                if (error) {
                    reject(error);
                }
                resolve({ message: `File created @ ${filePath}` });
            });
        });
    }

    readFile(sender, args) {
        return new Promise((resolve, reject) => {
            fs.readFile(args.path, function (error, data) {
                if (error) {
                    reject(error);
                }
                resolve(data.toString());
            });
        });
    }
}