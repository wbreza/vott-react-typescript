import shortid from "shortid";
import { IConnection, IProject, ITag, IApplicationState } from "../../models/applicationState";

const sampleConnections = createSampleConnections();
const sampeProjects = createSampleProjects();

const initialState: IApplicationState = {
    appSettings: {
        devToolsEnabled: false,
        connection: null,
    },
    connections: null, // sampleConnections,
    recentProjects: null, // sampeProjects,
    currentProject: null,
};

function createSampleConnections(count: number = 5): IConnection[] {
    const connections: IConnection[] = [];
    for (let i = 1; i <= count; i++) {
        connections.push({
            id: shortid.generate(),
            name: `Connection ${i}`,
            providerType: "sample",
            providerOptions: {},
        });
    }

    return connections;
}

function createSampleProjects(count: number = 5): IProject[] {
    const projects: IProject[] = [];
    for (let i = 1; i <= count; i++) {
        projects.push({
            id: shortid.generate(),
            name: `Project ${i}`,
            description: `Sample description for connection ${i}`,
            exportFormat: {
                id: "export-format-1",
                name: "Custom Vision Service",
                providerType: "CVS",
                providerOptions: {},
            },
            sourceConnection: getRandomConnection(sampleConnections),
            targetConnection: getRandomConnection(sampleConnections),
            tags: createSampleTags(),
            autoSave: true,
        });
    }

    return projects;
}

function getRandomConnection(connections: IConnection[]): IConnection {
    const index = Math.floor((Math.random() * connections.length));
    return connections[index];
}

function createSampleTags(count: number = 10): ITag[] {
    const tags: ITag[] = [];
    for (let i = 1; i <= count; i++) {
        tags.push({
            name: `tag-${i}`,
            color: "#333",
        });
    }

    return tags;
}

export default initialState;
