import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { IApplicationState } from "../../../../models/applicationState";
import { MockFactory } from "../../../../models/mockState";
import initialState from "../../../../redux/store/initialState";
import createReduxStore from "../../../../redux/store/store";
import ProjectSettingsPage from "./projectSettingsPage";

describe("Project settings page", () => {
    let onChangeHandler: (value: any) => void;
    let wrapper: any = null;

    const defaultState: IApplicationState = initialState;
    const store = createReduxStore(defaultState);
    const history: any = null;
    const location: any = null;
    const mockFactory = new MockFactory();
    const match = mockFactory.match();
    const project = mockFactory.project();
    const projectActions = mockFactory.projectActions();
    const connectionActions = mockFactory.connectionActions();
    const connections = mockFactory.connections();

    describe("Empty project", () => {
        it("should have empty project name field", () => {
            expect(wrapper.find("#input#root_name").props().value).toBeUndefined();
        });

        it("should have empty source connection field", () => {
            throw new Error("Not implemented");
        });

        it("should have empty target connection field", () => {
            throw new Error("Not implemented");
        });

        it("should have empty export format field", () => {
            throw new Error("Not implemented");
        });

        it("should have empty description field", () => {
            throw new Error("Not implemented");
        });

        it("should have empty tags input", () => {
            throw new Error("Not implemented");
        });

        it("should render new connection page on clicking Add Connection", () => {
            throw new Error("Not implemented");
        });

        it("should call onChange handler when typing into text boxes", () => {
            throw new Error("Not implemented");
        });

        it("should call onChange handler when creating a new tag", () => {
            throw new Error("Not implemented");
        });

        it("should add new tags to state", () => {
            throw new Error("Not implemented");
        });

        it("should remove tags from state", () => {
            throw new Error("Not implemented");
        });

        it("should re-order tags in state", () => {
            throw new Error("Not implemented");
        });
    });

    describe("Load project", () => {

        beforeEach(() => {
            onChangeHandler = jest.fn();

            wrapper = mount(
                <Provider store={store}>
                    <Router>
                        <ProjectSettingsPage
                            project={project}
                            projectActions={projectActions}
                            connectionActions={connectionActions}
                            connections={connections}
                            history={history}
                            location={location}
                            match={match}/>
                    </Router>
                </Provider>,
            );
        });
        it("should load project name into field", () => {
            expect(wrapper.find("input#root_name").props().value).toBe(project.name);
        });

        it("should load source connection into field", () => {
            throw new Error("Not implemented");
        });

        it("should load target connection into field", () => {
            throw new Error("Not implemented");
        });

        it("should load export format into field", () => {
            throw new Error("Not implemented");
        });

        it("should load description into field", () => {
            throw new Error("Not implemented");
        });

        it("should load tags into widget", () => {
            throw new Error("Not implemented");
        });
    });
});
