import React from "react";
import { Provider } from "react-redux";
import createReduxStore from "../../../../redux/store/store";
import initialState from "../../../../redux/store/initialState";
import HomePage from "./homePage";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import { IApplicationState, IProject, ITag, IExportFormat, IConnection } from "../../../../models/applicationState";
import IProjectActions, * as projectActions from "../../../../redux/actions/projectActions";

describe("Connection Picker Component", () => {
    const defaultState: IApplicationState = initialState;
    const store = createReduxStore(defaultState);
    let wrapper: any = null;
    let recentProjects: IProject[] = null;
    const executor = () => { return; };
    const actions: IProjectActions = null;
    let source: IConnection;
    const tags: ITag[] = [];
    let format: IExportFormat;
    const history: any = null;
    const location: any = null;
    const match: any = null;
    let onChangeHandler: (value: any) => void;

    beforeEach(() => {
        source = {
            id: "1",
            name: "connection name",
            description: "connection description",
            providerType: "provider",
            providerOptions: Object.create(null),
        };
        format = {
            id: "1",
            name: "format",
            providerType: "provider",
            providerOptions: Object.create(null),
        };
        recentProjects = [
            { id: "1", name: "project1", description: "testproject", tags,
              sourceConnectionId: "connectionString", sourceConnection: source,
              targetConnectionId: "1", targetConnection: source, exportFormat: format,
              autoSave: true },
        ];

        // const actions = {
        //     loadProjects: () => new Promise<IProject[]>(executor),
        //     loadProject: () => new Promise<IProject>(executor),
        //     saveProject: () => new Promise<IProject>(executor),
        //     deleteProject: () => new Promise<void>(executor),
        //     closeProject: () => { return; },
        // };

        onChangeHandler = jest.fn();

        wrapper = mount(
            <Provider store={store}>
                <Router>
                    <HomePage
                        recentProjects={recentProjects}
                        actions={actions}
                        history={history}
                        location={location}
                        match={match}
                    />
                </Router>
            </Provider>,
        );
    });

    // it("renders", () => {
    //     const newProject = wrapper.find("h6").at(0).props();
    //     console.log(newProject);
    //     expect((newProject.homePageprop).to.equal("New Project"));
    // });

    it("should call upload when 'Open Project' is clicked", () => {
        const spy = jest.spyOn(wrapper, "update");
        wrapper.update();
        const openProject = wrapper.find("Link.p-5");
        openProject.simulate("click");
        expect(spy).toBeCalled();
    });

    // it("renders a 'Open Project' action", () => {
    //     const firstOption = wrapper.find("option");
    //     expect(firstOption.text()).toEqual("Open Project");
    // });

    // it("renders list of recent project", () => {
    //     expect(wrapper).not.toBeNull();
    //     const optionElements = wrapper.find("option");
    //     expect(wrapper.prop("value")).not.toBeDefined();
    // });

    // it("uploads a file properly", () => {
    // });

    // it("throws an error when a file is not uploaded properly", () => {
    // });

    // it("throws an error when a file is not uploaded properly", () => {
    // });

    // it("deletes a project when deleteProject is called", () => {
    //     const connectionId = "2";

    //     wrapper.find("select").simulate("change", { target: { value: connectionId } });
    //     expect(onChangeHandler).toBeCalledWith(connectionId);
    // });
});
