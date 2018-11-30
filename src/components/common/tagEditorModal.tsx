import React from 'react';
import ReactModal from 'react-modal';
import formSchema from './tagEditorModal.json'
import Form from 'react-jsonschema-form'



const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

interface TagEditorModalProps {
    tag: any;
    showModal: boolean;
    onOk: (value) => void;
}

interface TagEditorModalState {
    tag: any;
    formData: any;
    isOpen: boolean;
}

export class TagEditorModal extends React.Component<TagEditorModalProps, TagEditorModalState> {
    
    
    constructor(props: TagEditorModalProps){
        super(props);
        this.state = {
            tag: props.tag,
            formData: {},
            isOpen: false
        }
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    //component did update

    // componentDidUpdate(prevProps) {
    //     if (this.props.connection && prevProps.connection !== this.props.connection) {
    //         this.bindForm(this.props.connection);
    //     }
    // }

    componentDidUpdate(prevProps){
        if(this.props.tag && prevProps.tag !== this.props.tag){
            this.setState({
                tag: this.props.tag
            })
        }
    }

    handleFormChange(results) {
        this.setState({
            tag: {
                id: results.formData.name,
                color: results.formData.color
            }
        }, () => {})
    }

    handleOk(){
        this.props.onOk(this.state.tag);
    }

    handleCancel(){
        this.setState({
            isOpen: false
        })
    }


    render() {
        return (
            <div>
                <ReactModal 
                    isOpen={this.props.showModal}>
                    <Form
                        schema={formSchema}
                        onChange={this.handleFormChange}
                        formData={{
                            name: this.state.tag.id,
                            color: this.state.tag.color
                        }}>
                        <button type="button" onClick={this.handleCancel}>Close</button>
                        <button type="button" onClick={this.handleOk}>OK</button>
                        {/*Need a close modal button and ok button */}
                    </Form>
                </ReactModal>
            </div>
        )
    }
}