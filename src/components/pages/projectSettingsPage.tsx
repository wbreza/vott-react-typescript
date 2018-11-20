import React from 'react';
import Form from 'react-jsonschema-form'
import formSchema from './schemas/projectSettingsPage.json'
import uiSchema from './schemas/ui/projectSettingsPage.json'
import LocalFileSystemProxy from '../../providers/storage/localFileSystem'

export interface IProjectPageProps {

}

export interface IProjectPageState {
    formSchema: any,
    formData: any
}

export default class ProjectSettingsPage extends React.Component<IProjectPageProps, IProjectPageState> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            formSchema: {...formSchema},
            formData: {}
        }

        this.onFormChange = this.onFormChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    componentDidMount = () => {

    }

    onFormChange = async (args) => {
        console.log("changed");
        console.log("Form changed");
        let fileSystem = new LocalFileSystemProxy();
        await fileSystem.writeFile("","../../TESTFILE.json");
    };

    onFormSubmit = async (args) => {
        console.log("submitted");
        console.log("Form submitted");
        let fileSystem = new LocalFileSystemProxy();
        await fileSystem.writeFile("","../../TESTFILE.json");
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
