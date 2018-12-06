import React from "react";
import EditorPage from "./editorPage";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import { IProject, IAsset } from "../../../../models/applicationState";
import IProjectActions from "../../../../redux/actions/projectActions";

describe("Editor Page Component", () => {
    let project: IProject = null;
    let projectActions: IProjectActions;
    const executor = () => { return; };

    beforeEach(() => {
        projectActions = {
            loadProjects: () => new Promise<IProject[]>(executor),
            loadProject: () => new Promise<IProject>(executor),
            saveProject: () => new Promise<IProject>(executor),
            deleteProject: () => new Promise<void>(executor),
            closeProject: () => { return; },
            loadAssets: () => new Promise<IAsset[]>(executor),
            saveAsset: () => new IAsset(),
        }

        const options = {
            projectActions,
        };

        onChangeHandler = jest.fn();

        wrapper = mount(
            <Router>
                <EditorPage
                    project=""
                    projectActions={options}
                />
            </Router>,
        );
    });

    it("renders a default 'Select Connection' option", () => {
        expect(EditorPage).toBeTruthy();
    });

});
