import axios from "axios";
import { IAsset } from "../../store/applicationState";
import { IStorageProvider } from "./storageProvider";
import { IAssetService } from "../../services/assetService";

export interface IBingImageSearchOptions {
    apiKey: string;
    query: string;
    aspectRatio: BingImageSearchAspectRatio;
}

export enum BingImageSearchAspectRatio {
    Square = "Square",
    Wide = "Wide",
    Tall = "Tall",
    All = "All",
}

export class BingImageSearch implements IAssetService, IStorageProvider {
    private static SEARCH_URL = "https://api.cognitive.microsoft.com/bing/v7.0/images/search";

    constructor(private options: IBingImageSearchOptions) { }

    public readText(filePath: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    public readBinary(filePath: string): Promise<Buffer> {
        throw new Error("Method not implemented.");
    }

    public deleteFile(filePath: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public writeText(filePath: string, contents: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public writeBinary(filePath: string, contents: Buffer): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async getAssets(): Promise<IAsset[]> {
        return Promise.resolve([]);
    }

    public async listFiles(folderPath?: string): Promise<string[]> {
        const query = {
            q: this.options.query,
            aspect: this.options.aspectRatio,
        };

        const url = `${BingImageSearch.SEARCH_URL}?${this.createQueryString(query)}`;

        const response = await axios.get(url, {
            headers: {
                "Ocp-Apim-Subscription-Key": this.options.apiKey,
                "Accept": "application/json",
            },
        });

        return response.data.value.map((item) => item.contentUrl);
    }

    public listContainers(folderPath?: string): Promise<string[]> {
        throw new Error("Method not implemented.");
    }

    public createContainer(folderPath: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public deleteContainer(folderPath: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    private createQueryString(object: any): string {
        const parts: any[] = [];

        for (const key of Object.getOwnPropertyNames(object)) {
            parts.push(`${key}=${encodeURIComponent(object[key])}`);
        }

        return parts.join("&");
    }
}
