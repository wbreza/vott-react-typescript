import React from "react";
import HomePage from "./homePage";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import { IProject, ITag, IConnection, IExportFormat } from "../../../store/applicationState";
import IProjectActions from "../../../actions/projectActions";
// import { IConnection } from "../../store/applicationState";

describe("Connection Picker Component", () => {
    let wrapper: any = null;
    let recentProjects: IProject[] = null;
    let actions: IProjectActions;
    let source: IConnection;
    let tags: ITag[];
    let format: IExportFormat;
    let onChangeHandler: (value: any) => void;

    beforeEach(() => {
        source = {
            id: "1",
            name: "connection name",
            description: "connection description",
            providerType: "provider",
            providerOptions: "options",
        }
        tags = [];
        format = {
            id: "1",
            name: "format",
            providerType: "provider",
            providerOptions: "options",
        }
        recentProjects = [
            { id: "1", name: "project1", description: "testproject", tags: tags, sourceConnectionId: "connectionString",
              sourceConnection: source, targetConnectionId: "1", targetConnection: source, exportFormat: format, autoSave: true },
        ];

        const actions = {
            loadProjects: () => {},
            loadProject: () => { return new Promise<IProject>() },
            saveProject: () => { return new Promise<IProject>() },
            deleteProject: () => { return new Promise<void>() },
            closeProject: () => {},
        };

        onChangeHandler = jest.fn();

        wrapper = mount(
            <Router>
                <HomePage
                    recentProjects={recentProjects}
                    actions={actions}
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
        expect(optionElements.length).toEqual(connections.length + 1);
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
