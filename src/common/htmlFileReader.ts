import { IAsset, AssetType } from "../store/applicationState";

export default class HtmlFileReader {
    public static readAsText(file: File): Promise<string | ArrayBuffer> {
        return new Promise<string | ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    resolve(reader.result);
                } else {
                    reject();
                }
            };

            reader.readAsText(file);
        });
    }

    public static readFileAttributes(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = "arraybuffer";
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        reject(xhr.status);
                    }

                    const blob = new Blob([xhr.response]);
                    const reader = new FileReader();
                    reader.onload = () => {
                        if (reader.result) {
                            try {
                                const parser = require("exif-parser").create(reader.result);
                                parser.enableImageSize(false);
                                const result = parser.parse();
                                resolve(result);
                            } catch (err) {
                                reject(err);
                            }
                        } else {
                            reject();
                        }
                    };

                    reader.readAsArrayBuffer(blob);
                }
            };

            xhr.open("GET", url);
            xhr.send();
        });
    }

    public static async readAssetAttributes(asset: IAsset): Promise<any> {
        switch (asset.type) {
            case AssetType.Image:
                return await this.readImageAttributes(asset.path);
            case AssetType.Video:
                return await this.readVideoAttributes(asset.path);
            default:
                throw new Error("Asset not supported");
        }
    }

    private static readVideoAttributes(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const video = document.createElement("video") as HTMLVideoElement;
            video.onloadedmetadata = () => {
                resolve({
                    width: video.videoWidth,
                    height: video.videoHeight,
                    duration: video.duration,
                });
            };
            video.onerror = reject;
            video.src = url;
        });
    }

    private static readImageAttributes(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const image = document.createElement("img") as HTMLImageElement;
            image.onload = () => {
                resolve({
                    width: image.naturalWidth,
                    height: image.naturalHeight,
                });
            };
            image.onerror = reject;
            image.src = url;
        });
    }

    private static readImageAttributes2(url: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const buffer = await HtmlFileReader.getArrayBufferForUrl(url);
                const parser = require("exif-parser").create(buffer);
                const result = parser.parse();

                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    private static getArrayBufferForUrl(url: string): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = "arraybuffer";
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        reject(xhr.status);
                    }

                    const blob = new Blob([xhr.response]);
                    const reader = new FileReader();
                    reader.onload = () => {
                        if (reader.result) {
                            resolve(reader.result as ArrayBuffer);
                        } else {
                            reject();
                        }
                    };

                    reader.readAsArrayBuffer(blob);
                }
            };

            xhr.open("GET", url);
            xhr.send();
        });
    }
}
