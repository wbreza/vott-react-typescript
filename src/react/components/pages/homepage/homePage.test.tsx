import React from "react";
import HomePage from "./homePage";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import { IApplicationState, IProject, ITag, IExportFormat, IConnection } from "../../../../models/applicationState";
import IProjectActions, * as projectActions from "../../../../redux/actions/projectActions";

describe("Connection Picker Component", () => {
    let wrapper: any = null;
    let recentProjects: IProject[] = null;
    let executor: () => {};
    let actions: IProjectActions;
    let source: IConnection;
    let tags: ITag[];
    let format: IExportFormat;
    let history: any = null;
    let location: any= null;
    let match: any=null;
    let onChangeHandler: (value: any) => void;

    beforeEach(() => {
        source = {
            id: "1",
            name: "connection name",
            description: "connection description",
            providerType: "provider",
            providerOptions: Object.create(null),
        }
        tags = [];
        format = {
            id: "1",
            name: "format",
            providerType: "provider",
            providerOptions: Object.create(null),
        }
        recentProjects = [
            { id: "1", name: "project1", description: "testproject", tags: tags, sourceConnectionId: "connectionString",
              sourceConnection: source, targetConnectionId: "1", targetConnection: source, exportFormat: format, autoSave: true },
        ];

        const actions = {
            loadProjects: () => { return new Promise<IProject[]>(executor) },
            loadProject: () => { return new Promise<IProject>(executor) },
            saveProject: () => { return new Promise<IProject>(executor) },
            deleteProject: () => { return new Promise<void>(executor) },
            closeProject: () => {},
        };

        onChangeHandler = jest.fn();

        wrapper = mount(
            <Router>
                <HomePage
                    recentProjects={recentProjects}
                    actions={actions}
                    history={history}
                    location={location}
                    match={match}
                />
            </Router>,
        );
    });

    it("renders a 'New Project' option", () => {
        const firstOption = wrapper.find("option").first();
        expect(firstOption.text()).toEqual("Select Connection");
    });

    it("renders a 'Open Project' option", () => {
        const firstOption = wrapper.find("option").first();
        expect(firstOption.text()).toEqual("Select Connection");
    });

    it("renders list of recent project", () => {
        expect(wrapper).not.toBeNull();
        const optionElements = wrapper.find("option");
        expect(wrapper.prop("value")).not.toBeDefined();
    });

    it("uploads a file properly", () => {
    });

    it("throws an error when a file is not uploaded properly", () => {
    });

    it("throws an error when a file is not uploaded properly", () => {
    });

    it("deletes a project when deleteProject is called", () => {
        const connectionId = "2";

        wrapper.find("select").simulate("change", { target: { value: connectionId } });
        expect(onChangeHandler).toBeCalledWith(connectionId);
    });
});
