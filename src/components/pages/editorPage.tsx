import React from "react";
<<<<<<< Updated upstream
=======
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IProject, IApplicationState as ApplicationState } from "../../store/applicationState";
import IProjectActions, * as projectActions from "../../actions/projectActions";
import { RouteComponentProps } from "react-router-dom";

interface IEditorPageProps extends RouteComponentProps, React.Props<IEditorPageProps> {
    project: IProject;
    projectActions: IProjectActions;
}

interface IEditorPageState {
    project: IProject;
    assets: string[];
}

function mapStateToProps(state: ApplicationState) {
    return {
        project: state.currentProject,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        projectActions: bindActionCreators(projectActions, dispatch),
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class EditorPage extends React.Component<IEditorPageProps, IEditorPageState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            project: this.props.project,
            assets: [],
        };

        const projectId = this.props.match.params["projectId"];
        if (this.props.project) {
            this.loadProjectAssets();
        } else if (projectId) {
            this.props.projectActions.loadProject(projectId);
        }
    }

    public async componentDidUpdate(prevProps) {
        if (prevProps.project !== this.props.project) {
            this.loadProjectAssets();
        }
    }
>>>>>>> Stashed changes

export default class EditorPage extends React.Component {
    public render() {
        return (
            <div>EditorPage</div>
        );
    }
}
