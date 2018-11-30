import { IProject } from "../store/applicationState";
import { IStorageProvider, StorageProviderFactory } from "../providers/storage/storageProvider";

export class AssetService {
    private storageProvider: IStorageProvider;

    constructor(private project: IProject) {
        this.storageProvider = StorageProviderFactory.create(
            this.project.sourceConnection.providerType,
            this.project.sourceConnection.providerOptions,
        );
    }

    public getAssets(): Promise<string[]> {
        return this.storageProvider.listFiles();
    }
}
