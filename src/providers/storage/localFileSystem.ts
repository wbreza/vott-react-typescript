import IFileStorage from './fileStorage'
import fs from 'fs'
import { isBuffer } from 'util';

export class LocalFileSystem implements IFileStorage {
    constructor(){}
    
    writeFile(content, path){
        return new Promise((resolve, reject) => {
            fs.writeFile(path, content, function(error) {
                if(error){
                    reject(error);
                }
                resolve({message: "File created"});
            })
        })
    }

    readFile(path){
        return new Promise((resolve, reject) => {
            fs.readFile(path, function(error, data) {
                if(error){
                    reject(error);
                }
                resolve(data.toString());
            })
        })
    }
}