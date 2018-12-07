import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import createReduxStore from "../../../../redux/store/store";
import initialState from "../../../../redux/store/initialState";
import { BrowserRouter as Router } from "react-router-dom";
import { Link } from "react-router-dom";

import ProjectSettingsPage from "./projectSettingsPage";
import { IApplicationState, IProject, IConnection, IExportFormat, ITag, IAsset } from "../../../../models/applicationState";
import { IProjectService } from "../../../../services/projectService";
import IProjectActions from "../../../../redux/actions/projectActions";
import { MockProjectActions, MockProject, MockConnections, MockConnectionActions } from "../../../../models/mockState";

describe("Project settings page", () => {
    let onChangeHandler: (value: any) => void;
    let wrapper: any = null;

    const defaultState: IApplicationState = initialState;
    const store = createReduxStore(defaultState);

    beforeEach(() => {
        onChangeHandler = jest.fn();
        wrapper = mount(
            <Provider store={store}>
                <Router>
                    <ProjectSettingsPage
                        project={MockProject}
                        projectActions={MockProjectActions}
                        connectionActions={MockConnectionActions}
                        connections={MockConnections}
                        history={null}
                        location={null}
                        match={null}/>,
                </Router>
            </Provider>,
        );
    });

    describe("Empty project", () => {
        it("should have empty project name field", () => {
            throw new Error("Not implemented");
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
        it("should load project name into field", () => {
            throw new Error("Not implemented");
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
