import fs from "fs";
import path from "path";
import shortid from "shortid";
import LocalFileSystem from "./localFileSystem";

describe("LocalFileSystem Storage Provider", () => {
    let localFileSystem: LocalFileSystem = null;

    beforeEach(() => {
        localFileSystem = new LocalFileSystem(null);
    });

    it("writes, reads and deletes a file as text", async () => {
        const filePath = path.join(process.cwd(), "test-output", `${shortid.generate()}.json`);
        const contents = {
            a: 1,
            b: 2,
            c: 3,
        };

        await localFileSystem.writeText(filePath, JSON.stringify(contents, null, 4));
        expect(fs.existsSync(filePath)).toBeTruthy();

        const json = await localFileSystem.readText(filePath);
        const actual = JSON.parse(json);

        expect(contents).toEqual(actual);

        await localFileSystem.deleteFile(filePath);
        expect(fs.existsSync(filePath)).toBeFalsy();
    });

    it("writes and deletes a container", async () => {
        const folderPath = path.join(process.cwd(), "test-output", shortid.generate());

        await localFileSystem.createContainer(folderPath);
        expect(fs.existsSync(folderPath)).toBeTruthy();

        await localFileSystem.deleteContainer(folderPath);
        expect(fs.existsSync(folderPath)).toBeFalsy();
    });

    it("lists files & containers in a provider", async () => {
        const fileFolderCount = 4;
        const testPath = path.join(process.cwd(), "test-output", shortid.generate());
        await localFileSystem.createContainer(testPath);

        for (let i = 1; i <= fileFolderCount; i++) {
            const filePath = path.join(testPath, `file${i}.txt`);
            await localFileSystem.writeText(filePath, "foobar");

            const containerPath = path.join(testPath, `folder${i}`);
            await localFileSystem.createContainer(containerPath);
        }

        const files = await localFileSystem.listFiles(testPath);
        const folders = await localFileSystem.listContainers(testPath);

        expect(files.length).toEqual(fileFolderCount);
        expect(folders.length).toEqual(fileFolderCount);

        await localFileSystem.deleteContainer(testPath);
    });
});
