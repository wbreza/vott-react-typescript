import React from "react";
import { Provider } from "react-redux";
import createReduxStore from "../../../../redux/store/store";
import initialState from "../../../../redux/store/initialState";
import EditorPage from "./editorPage";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import { IApplicationState,
         IProject,
         IAsset,
         ITag,
         IConnection,
         IExportFormat } from "../../../../models/applicationState";
import IProjectActions from "../../../../redux/actions/projectActions";
import AssetPreview from "./assetPreview";

describe("Editor Page Component", () => {
    const defaultState: IApplicationState = initialState;
    const store = createReduxStore(defaultState);
    let wrapper: any;
    let connection: IConnection;
    let format: IExportFormat;
    let project: IProject = null;
    let projectActions: IProjectActions;
    const executor = () => { return; };
    const history: any = null;
    const location: any = null;
    const match: any = null;
    let onChangeHandler: (value: any) => void;

    beforeEach(() => {
        connection = {
            id: "1",
            name: "connection",
            description: "test connection",
            providerType: "provider",
            providerOptions: {},
        };
        format = {
            id: "1",
            name: "export format",
            providerType: "provider",
            providerOptions: {},
        };
        project = {
            id: "1",
            name: "project1",
            description: "test project",
            tags: [],
            sourceConnectionId: "123",
            sourceConnection: connection,
            targetConnectionId: "456",
            targetConnection: connection,
            exportFormat: format,
            autoSave: true,
            assets: { id: "1", IAsset: {} },
        };
        projectActions = {
            loadProjects: () => new Promise<IProject[]>(executor),
            loadProject: () => new Promise<IProject>(executor),
            saveProject: () => new Promise<IProject>(executor),
            deleteProject: () => new Promise<void>(executor),
            closeProject: () => { return; },
            loadAssets: () => new Promise<IAsset[]>(executor),
            saveAsset: (asset: IAsset) => asset,
        };

        onChangeHandler = jest.fn();

        wrapper = mount(
            <Provider store={store}>
                <Router>
                    <EditorPage
                        project={project}
                        projectActions={projectActions}
                        history={history}
                        location={location}
                        match={match}
                    />
                </Router>
            </Provider>,
        );
    });

    // it("renders an AssetPreview object", () => {
    //     expect(wrapper.find(AssetPreview).exists()).toBeTruthy();
    // });

});
