import React from 'react';
import Form from 'react-jsonschema-form'

import formSchema from './schemas/projectSettingsPage.json'
import uiSchema from './schemas/ui/projectSettingsPage.json'

import * as fileActions from '../../actions/fileActions'
import { bindActionCreators } from 'redux';
import { connect } from 'http2';
import ApplicationState, { IAppSettings } from '../../store/applicationState';


export interface IProjectPageProps {
    actions: fileActions.IFileActions
}

export interface IProjectPageState {
    formSchema: any,
    formData: any
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(fileActions, dispatch)
    };
}


@connect(mapDispatchToProps)
export default class ProjectSettingsPage extends React.Component<IProjectPageProps, IProjectPageState> {
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
