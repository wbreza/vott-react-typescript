import React from 'react';
import Form from 'react-jsonschema-form'
import formSchema from './schemas/projectSettingsPage.json';
import uiSchema from './schemas/ui/projectSettingsPage.json'

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

    onFormChange = (args) => {
        
    };

    onFormSubmit = (args) => {
        console.log(args);
    }
    
    render() {
        return (
            <Form schema={formSchema} 
            uiSchema={uiSchema}/>
        );
    }
}
