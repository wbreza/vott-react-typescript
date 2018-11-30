import { AssetService } from "./assetService";
import { IProject } from "../store/applicationState";
import { StorageProviderFactory } from "../providers/storage/storageProvider";

describe("Asset Service", () => {
    it("is defined", () => {
        expect(AssetService).toBeDefined();
    });

    describe("Methods", () => {
        const files: string[] = [
            "c:\\project1\\image1.jpg",
            "c:\\project1\\image2.jpg",
            "c:\\project1\\image3.jpg",
            "c:\\project1\\image4.jpg",
        ];

        StorageProviderFactory.create = jest.fn(() => {
            return {
                listFiles: jest.fn(() => Promise.resolve(files)),
            };
        });

        const project: IProject = {
            id: "project-1",
            name: "Project 1",
            sourceConnection: {
                id: "connection-1",
                name: "Conneciton 1",
                providerType: "testProvider",
                providerOptions: null,
            },
            tags: [],
            targetConnection: null,
            autoSave: true,
            exportFormat: null,
        };

        it("gets assets from the configured storage provider", async () => {
            const assetService = new AssetService(project);
            const assets = await assetService.getAssets();

            expect(StorageProviderFactory.create)
                .toBeCalledWith(project.sourceConnection.providerType, project.sourceConnection.providerOptions);

            expect(assets.length).toEqual(files.length);
        });
    });
});
