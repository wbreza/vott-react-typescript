import React from 'react'
import './tagsInput.scss'
import './tagColors.scss'
import { WithContext as ReactTags } from 'react-tag-input';
import { randomIntInRange } from "../../common/utils"
import { TagEditorModal } from './tagEditorModal'
import ReactModal from 'react-modal';

import modalFormSchema from './tagEditorModal.json'
import Form from 'react-jsonschema-form'



interface TagsInputProps {
    tags: any;
    onChange: (value) => void;
}

interface TagsInputState {
    tags: any;
    currentTagColor: number;
    selectedTag: any;
    showModal: boolean;
}

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default class TagsInput extends React.Component<TagsInputProps, TagsInputState> {
    
    numberOfColors = 15;

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            currentTagColor: randomIntInRange(0, this.numberOfColors),
            selectedTag: {
                id: "No tag selected"
            },
            showModal: false
        }
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);
        this.handleEditedTag = this.handleEditedTag.bind(this);
    }

    handleCloseModal(){
        this.setState({showModal: false})
    }

    private convertToFlatList(tags) {
        return tags.map(element => element.id).join();
    }

    private getEditedTag(currentTag){
        return {
            id: "Test Tag",
            text: "Test Tag",
            color: "color-14"
        }
    }

    private handleEditedTag(results){
        
        var newTag = {
            id: results.formData.name,
            color: results.formData.color
        }
        this.addHtml(newTag);
        this.setState(prevState => {
            return {
                tags: prevState.tags.map(tag => {
                    if(tag.id === prevState.selectedTag.id){
                        tag = newTag;
                    }
                    return tag;
                }),    
                showModal: false
            } 
        }, () => this.props.onChange(this.convertToFlatList(this.state.tags)));
    }

    private getIndexOfTag(tagName){
        const {tags} = this.state;
        var i;
        for(i = 0; i < tags.length; i++){
            if (tags[i].id === tagName) {
                return i;
            }
        }
        return -1;
    }

    private getTag(tagName){
        const {tags} = this.state;
        var i;
        for(let tag of tags){
            if (tag.id === tagName){
                return tag;
            }
        }
        return null;
    }

    private handleTagClick(event){
        this.setState({
            showModal: true,
            selectedTag: this.getTag(event.currentTarget.innerText)
        })
    }

    private addHtml(tag){
        tag.text = 
            <div className="inline-block" onDoubleClick={this.handleTagClick}>
                <div className={"inline-block box " + tag.color}></div>
                <span className="tag-text">{tag.id}</span>
            </div>
    }

    private handleAddition = (tag) => {
        tag.color = "color-" + this.state.currentTagColor;

        this.addHtml(tag);
        this.setState(prevState => {
            return {
                tags: [...this.state.tags, tag],
                currentTagColor: (prevState.currentTagColor + 1) % this.numberOfColors
            }            
        }, () => this.props.onChange(this.convertToFlatList(this.state.tags)));
    }

    private handleDelete (i){
        const { tags } = this.state;
        this.setState(prevState => {
            return {
                tags: tags.filter((tag, index) => index !== i)
            }
        }, () => this.props.onChange(this.convertToFlatList(this.state.tags)));
    }

    private handleDrag(tag, currPos, newPos){
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags },
            () => this.props.onChange(this.convertToFlatList(this.state.tags)));
    }

    render() {
        const { tags } = this.state;
        return (
            <div>
                <ReactTags tags={tags}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} />
                <ReactModal 
                    isOpen={this.state.showModal}
                    contentLabel={this.state.selectedTag.id}>
                    <Form
                        schema={modalFormSchema}
                        onSubmit={this.handleEditedTag}
                        formData={{
                            name: this.state.selectedTag.id,
                            color: this.state.selectedTag.color
                        }}>
                    </Form>
                </ReactModal>
            </div>
        )
    }

}