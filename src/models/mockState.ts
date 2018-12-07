import ProjectSettingsPage from "../react/components/pages/projectSettings/projectSettingsPage";
import { IProject, IConnection, IExportFormat,
    ITag, IAsset, IApplicationState, IAppSettings,
    IAssetMetadata, ISize } from "../models/applicationState";
import { IProjectService } from "../services/projectService";
import IProjectActions from "../redux/actions/projectActions";
import IConnectionActions, { loadConnection, deleteConnection } from "../redux/actions/connectionActions";

export class MockFactory {
    public tags(): ITag[] {
        return [
            {
                name: "Tag1",
                color: "#FFFFFF",
            },
            {
                name: "Tag2",
                color: "#FFFF00",
            },
        ];
    }

    public connections(): IConnection[] {
        return [
            {
                id: "connectionId",
                name: "My source connection",
                description: "This is my connection",
                providerType: "azureBlobStorage",
                providerOptions: {
                    connectionString: "myconnectionstring",
                    containerName: "container",
                    createContainer: true,
                },
            },
            {
                id: "connectionId",
                name: "My target connection",
                description: "This is my connection",
                providerType: "localFileSystemProxy",
                providerOptions: {
                    folderPath: "my path",
                },
            },
        ];
    }

    public exportFormat(): IExportFormat {
        return {
            id: "exportFormatId",
            name: "exportFormatName",
            providerType: "tensorflow",
            providerOptions: {},
        };
    }

    public project(): IProject {
        const connections = this.connections();
        return {
            id: "id",
            name: "Test Project",
            description: "This is my project",
            tags: this.tags(),
            sourceConnection: connections[0],
            targetConnection: connections[1],
            exportFormat: this.exportFormat(),
            autoSave: true,
        };
    }

    public projectService(): IProjectService {
        return {
            get: jest.fn((id: string) => Promise.resolve()),
            getList: jest.fn(() => Promise.resolve()),
            save: jest.fn((project: IProject) => Promise.resolve()),
            delete: jest.fn((project: IProject) => Promise.resolve()),
        };
    }

    public projectActions(): IProjectActions {
        return {
            loadProjects: jest.fn(() => Promise.resolve()),
            loadProject: jest.fn((value: IProject | string) => Promise.resolve()),
            saveProject: jest.fn((project: IProject) => Promise.resolve()),
            deleteProject: jest.fn((project: IProject) => Promise.resolve()),
            closeProject: jest.fn(() => Promise.resolve()),
            loadAssets: jest.fn((project: IProject) => Promise.resolve()),
            saveAsset: jest.fn((asset: IAsset) => Promise.resolve()),
        };
    }

    public connectionActions(): IConnectionActions {
        return {
            loadConnections: jest.fn(() => Promise.resolve()),
            loadConnection: jest.fn((connectionId: string) => Promise.resolve()),
            saveConnection: jest.fn((connectionId: string) => Promise.resolve()),
            deleteConnection: jest.fn((connectionId: string) => Promise.resolve()),
            closeConnection: jest.fn(() => Promise.resolve()),
        };
    }

    public match() {
        return {
            params: {
                projectId: null,
            },
            isExact: null,
            path: null,
            url: null,
        };
    }
}
