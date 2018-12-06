import AzureStorageBlob from "../../vendor/azurestoragejs/azure-storage.blob.js";
import { AzureCloudStorageService, IAzureCloudStorageOptions } from "./azureBlobStorage";
import { StorageProviderFactory } from "./storageProvider";
import registerProviders from "../../registerProviders";

const content = "This is the content";
const containers = ["container1", "container2", "container3"];
const files = ["file1.txt", "file2.txt", "file3.txt"];
const path = "container/filename.txt";
const containerName = "container";
const fileName = "filename.txt";

const fakeBlobService = {
    getBlobToText: jest.fn((container, filename, callback) => callback(null, content)),
    deleteBlobIfExists: jest.fn((container, filename, callback) => callback(null)),
    createBlockBlobFromText: jest.fn((container, filename, content, callback) => callback(null)),
    createContainerIfNotExists: jest.fn((container, options, callback) => callback(null)),
    listBlobsSegmented: jest.fn((container, callback) => callback(null, files)),
    listContainersSegmented: jest.fn((options, callback) => callback(null, containers)),
    deleteContainer: jest.fn((container, callback) => callback(null)),
};

describe("Azure blob functions", () => {

    let provider: AzureCloudStorageService = null;
    const options: IAzureCloudStorageOptions = {
        connectionString: "fake connection string",
        containerName: "container",
        createContainer: false,
    };

    registerProviders();

    beforeEach(() => {
        AzureStorageBlob.createBlobService = jest.fn(() => fakeBlobService);
    });

    describe("Initializing Connection", () => {
        it("Create blob service", async () => {
            const azure = new AzureCloudStorageService(options);
            await azure.listContainers(null);
            expect(AzureStorageBlob.createBlobService).toBeCalledWith(options.connectionString);
        });
    });

    describe("After connection is initialized", () => {
        beforeEach(() => {
            provider = new AzureCloudStorageService(options);
        });

        it("Provider is registered with the StorageProviderFactory", () => {
            const storageProvider = StorageProviderFactory.create("azureBlobStorage", options);
            expect(storageProvider).not.toBeNull();
        });

        it("Get Blob to Text", async () => {
            const result = await provider.readText(path);
            expect(result).toBe(content);
            expect(fakeBlobService.getBlobToText).toBeCalledWith(
                containerName,
                fileName,
                expect.any(Function),
            );
        });

        it("Get Blob to Binary", () => {
            // Skipping for now
        });

        it("Write text", async () => {
            await provider.writeText(path, content);
            expect(fakeBlobService.createBlockBlobFromText).toBeCalledWith(
                containerName,
                fileName,
                content,
                expect.any(Function),
            );
        });

        it("Write binary", () => {
            // Skipping for now, but 'createBlockBlobFromText' also takes a buffer
        });

        it("Delete file", async () => {
            await provider.deleteFile(path);
            expect(fakeBlobService.deleteBlobIfExists).toBeCalledWith(
                containerName,
                fileName,
                expect.any(Function),
            );
        });

        it("List files", async () => {
            const result = await provider.listFiles(path);
            expect(result).toBe(files);
            expect(fakeBlobService.listBlobsSegmented).toBeCalledWith(
                containerName,
                expect.any(Function),
            );
        });

        it("List containers", async () => {
            const result = await provider.listContainers(path);
            expect(result).toBe(containers);
            expect(fakeBlobService.listContainersSegmented).toBeCalledWith(
                null,
                expect.any(Function),
            );
        });

        it("Create container", async () => {
            await provider.createContainer(path);
            expect(fakeBlobService.createContainerIfNotExists).toBeCalledWith(
                containerName,
                { publicAccessLevel: "blob" },
                expect.any(Function),
            );
        });
    });
});
