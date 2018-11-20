import React from 'react';
import Form from 'react-jsonschema-form'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import formSchema from './schemas/projectSettingsPage.json'
import uiSchema from './schemas/ui/projectSettingsPage.json'

import * as fileActions from '../../actions/fileActions'

import ApplicationState, { IAppSettings } from '../../store/applicationState';


export interface IProjectPageProps {
    actions: fileActions.IFileActions
}

function mapStateToProps(state: ApplicationState) {
    return {
        appSettings: state.appSettings
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(fileActions, dispatch)
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ProjectSettingsPage extends React.Component<IProjectPageProps> {
    constructor(props) {
        super(props);

        this.state = {
            formSchema: { ...formSchema },
            formData: {}
        }

        this.onFormChange = this.onFormChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    readFile = (path) => {
        return this.props.actions.readFile(path);
    }

    writeFile = () => {
        return this.props.actions.writeFile("test.json", { "contents": "hello" });
        //console.log(this.props.actions);
    }


    onFormChange = async (args) => {
        console.log("changed");
    };

    onFormSubmit = async (args) => {
        console.log("submitted");
        this.readFile('./projectSettingsPage.tsx')
            .then((result) => console.log(result));
    }

    async waitForPromise() {

    }

    render() {
        return (
            <Form schema={formSchema}
                uiSchema={uiSchema}
                onSubmit={this.onFormSubmit}
                onChange={this.onFormChange} />
        );
    }
}
