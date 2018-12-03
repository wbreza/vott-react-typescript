import React from "react";
import ReactModal from "react-modal";
import formSchema from "./tagEditorModal.json";
import Form from "react-jsonschema-form";

const customStyles = {
    content : {
      top                   : "50%",
      left                  : "50%",
      right                 : "auto",
      bottom                : "auto",
      marginRight           : "-50%",
      transform             : "translate(-50%, -50%)",
    },
  };

interface ITagEditorModalProps {
    tag: any;
    showModal: boolean;
    onOk: (value) => void;
    onCancel: (value) => void;
}

interface ITagEditorModalState {
    tag: any;
    formData: any;
    isOpen: boolean;
}

export class TagEditorModal extends React.Component<ITagEditorModalProps, ITagEditorModalState> {

    constructor(props: ITagEditorModalProps) {
        super(props);
        this.state = {
            tag: props.tag,
            formData: {},
            isOpen: false,
        };
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleOk = this.handleOk.bind(this);
    }

    public componentDidUpdate(prevProps) {
        if (this.props.tag && prevProps.tag !== this.props.tag) {
            this.setState({
                tag: this.props.tag,
            });
        }
    }

    public handleFormChange(results) {
        this.setState({
            tag: {
                id: results.formData.name,
                color: results.formData.color,
            },
        });
    }

    public handleOk() {
        this.props.onOk(this.state.tag);
    }

    public render() {
        return (
            <div>
                <ReactModal
                    isOpen={this.props.showModal}
                    style={customStyles}
                    >

                    <Form
                        schema={formSchema}
                        onChange={this.handleFormChange}
                        formData={{
                            name: this.state.tag.id,
                            color: this.state.tag.color,
                        }}>
                        <button type="button" onClick={this.props.onCancel}>Close</button>
                        <button type="button" onClick={this.handleOk}>OK</button>
                        {/*Need a close modal button and ok button */}
                    </Form>
                </ReactModal>
            </div>
        );
    }
}
