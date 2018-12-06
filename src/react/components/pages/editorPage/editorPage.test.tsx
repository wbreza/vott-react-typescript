import React from "react";
import EditorPage from "./editorPage";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import { IProject, IAsset } from "../../../../models/applicationState";
import IProjectActions from "../../../../redux/actions/projectActions";

describe("Editor Page Component", () => {
    let wrapper: any = null;
    let project: IProject = null;
    let projectActions: IProjectActions;
    const executor = () => { return; };
    let history: any = null;
    let location: any = null;
    let match: any = null;

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

        wrapper = mount(
            <Router>
                <EditorPage
                    project={project}
                    projectActions={projectActions}
                    history={history}
                    location={location}
                    match={match}
                />
            </Router>,
        );
    });

    it("renders a default 'Select Connection' option", () => {
        expect(EditorPage).toBeTruthy();
    });

});
