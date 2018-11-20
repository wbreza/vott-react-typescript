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


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(fileActions, dispatch)
    };
}

@connect(mapDispatchToProps)
export default class ProjectSettingsPage extends React.Component<IProjectPageProps> {
    constructor(props) {
        super(props);

        this.state = {
            formSchema: {...formSchema},
            formData: {}
        }

        this.onFormChange = this.onFormChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    readFile = () => {
        this.props.actions.readFile("");
    }

    writeFile = () => {
        this.props.actions.writeFile("",{})
    }


    onFormChange = async (args) => {
        console.log("changed");
    };

    onFormSubmit = async (args) => {
        console.log("submitted");
        this.writeFile();
    }

    async waitForPromise(){

    }
    
    render() {
        return (
            <Form schema={formSchema} 
            uiSchema={uiSchema}
            onSubmit={this.onFormSubmit}
            onChange={this.onFormChange}/>
        );
    }
}
