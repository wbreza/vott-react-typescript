import ConnectionForm from "../components/pages/connections/connectionForm";

export default interface IApplicationState {
    appSettings: IAppSettings;
    connections: IConnection[];
    recentProjects: IProject[];
    currentProject: IProject;
}

export interface IAppSettings {
    devToolsEnabled: boolean;
    connectionId?: string;
    connection: IConnection;
}

export interface IProject {
    id: string;
    name: string;
    description?: string;
    tags: ITag[];
    sourceConnectionId?: string;
    sourceConnection: IConnection;
    targetConnectionId?: string;
    targetConnection: IConnection;
    exportFormat: IExportFormat;
    autoSave: boolean;
}

export interface ITag {
    name: string;
    color: string;
}

export interface IConnection {
    id: string;
    name: string;
    description?: string;
    providerType: string;
    providerOptions: any;
}

export interface IExportFormat {
    id: string;
    name: string;
    providerType: string;
    providerOptions: any;
}
