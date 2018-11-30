import React from 'react';
import Modal from 'react-modal';

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
    onSubmit: (value) => void;
}

interface TagEditorModalState {
    tag: any;
    isOpen: boolean;
}

export class TagEditorModal extends React.Component<TagEditorModalProps, TagEditorModalState> {
    constructor(props: TagEditorModalProps){
        super(props);
        this.state = {
            tag: props.tag,
            isOpen: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    openModal(){

    }

    

    closeModal(){

    }

    handleSubmit(){

    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.isOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                />
                <button onClick={this.closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </div>
        )
    }
}