import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ApplicationState, { IProject } from "../../store/applicationState";
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

    public render() {
        const { project } = this.props;
        const { assets } = this.state;

        if (!project) {
            return (<div>Loading...</div>);
        }

        return (
            <div>
                <h3>{project.name}</h3>
                {assets.map((path) => <div key={path}><img src={path} width="200" /></div>)}
            </div>
        );
    }

    private async loadProjectAssets() {
        const assets = await this.props.projectActions.loadAssets(this.props.project);

        this.setState({
            assets,
        });
    }
}
