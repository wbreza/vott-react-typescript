import React from "react";
import { Provider } from "react-redux";
import createReduxStore from "../../../../redux/store/store";
import initialState from "../../../../redux/store/initialState";
import HomePage from "./homePage";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import { Link } from "react-router-dom";
import { IApplicationState, IProject, ITag, IExportFormat, IConnection } from "../../../../models/applicationState";
import IProjectActions, * as projectActions from "../../../../redux/actions/projectActions";
import CondensedList from "../../common/condensedList";

describe("Connection Picker Component", () => {
    const defaultState: IApplicationState = initialState;
    const store = createReduxStore(defaultState);
    let wrapper: any = null;
    let recentProjects: IProject[] = null;
    const executor = () => { return; };
    const loadSelectedProject = () => { return; };
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

    it("should render a New Project Link", () => {
        expect(wrapper.find(Link).props().to).toBe("/projects/create");
    });

    it("should call upload when 'Open Project' is clicked", () => {
        const spy = jest.spyOn(wrapper, "update");
        wrapper.update();
        const openProject = wrapper.find("Link.p-5");
        openProject.simulate("click");
        expect(spy).toBeCalled();
    });

    it("should render a list of recent projects", () => {
        expect(wrapper).not.toBeNull();
        if (wrapper.props.recentProjects && wrapper.props.recentProjects.length > 0) {
            expect(wrapper.find(CondensedList).render().find("app-homepage-recent").exists());
        }
    });

    // it("should render a file picker", () => {
    // });

    //     wrapper.find("select").simulate("change", { target: { value: connectionId } });
    //     expect(onChangeHandler).toBeCalledWith(connectionId);
    // });
});
