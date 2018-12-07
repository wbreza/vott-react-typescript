import ProjectSettingsPage from "../react/components/pages/projectSettings/projectSettingsPage";
import { IProject, IConnection, IExportFormat, ITag, IAsset, IApplicationState, IAppSettings, IAssetMetadata, ISize } from "../models/applicationState";
import { IProjectService } from "../services/projectService";
import IProjectActions from "../redux/actions/projectActions";
import IConnectionActions, { loadConnection, deleteConnection } from "../redux/actions/connectionActions";

// export const MockApplicationState : IApplicationState = {

// }

// export const MockAppSettings :IAppSettings = {

// }
export const MockProject: IProject = {
    id: "id",
    name: "Test Project",
    description: "This is my project",
    tags: [
        {
            name: "Tag1",
            color: "#FFFFFF",
        },
        {
            name: "Tag2",
            color: "#FFFF00",
        },
    ],
    sourceConnection: {
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
    targetConnection: {
        id: "connectionId",
        name: "My target connection",
        description: "This is my connection",
        providerType: "localFileSystemProxy",
        providerOptions: {
            folderPath: "my path",
        },
    },
    exportFormat: {
        id: "exportFormatId",
        name: "exportFormatName",
        providerType: "tensorflow",
        providerOptions: {},
    },
    autoSave: true,
};

// export const MockTag: ITag = {

// }

// export const MockConnection: IConnection = {

// }

// export const MockExportFormat: IExportFormat = {

// }

// export const MockAsset: IAsset = {

// }

// export const MockAssetMetadata: IAssetMetadata = {

// }

// export const MockSize: ISize = {

// }

// export const MockRegion: IRegion = {

// };

export const MockProjectService: IProjectService = {
    get: jest.fn((id: string) => Promise.resolve()),
    getList: jest.fn(() => Promise.resolve()),
    save: jest.fn((project: IProject) => Promise.resolve()),
    delete: jest.fn((project: IProject) => Promise.resolve()),
};

export const MockProjectActions: IProjectActions = {
    loadProjects: jest.fn(() => Promise.resolve()),
    loadProject: jest.fn((value: IProject | string) => Promise.resolve()),
    saveProject: jest.fn((project: IProject) => Promise.resolve()),
    deleteProject: jest.fn((project: IProject) => Promise.resolve()),
    closeProject: jest.fn(() => Promise.resolve()),
    loadAssets: jest.fn((project: IProject) => Promise.resolve()),
    saveAsset: jest.fn((asset: IAsset) => Promise.resolve()),
};



export const MockConnectionActions: IConnectionActions = {
    loadConnections: jest.fn(() => Promise.resolve()),
    loadConnection: jest.fn((connectionId: string) => Promise.resolve()),
    saveConnection: jest.fn((connectionId: string) => Promise.resolve()),
    deleteConnection: jest.fn((connectionId: string) => Promise.resolve()),
    closeConnection: jest.fn(() => Promise.resolve()),
};

export const MockConnections: IConnection[] = [
];
