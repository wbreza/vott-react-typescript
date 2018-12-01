import React from 'react'
import './tagsInput.scss'
import './tagColors.scss'
import tagColors from './tagColors.json'
import { WithContext as ReactTags } from 'react-tag-input';
import { randomIntInRange } from "../../../common/utils"
import { TagEditorModal } from './tagEditorModal/tagEditorModal'



interface TagsInputProps {
    tags: any;
    onChange: (value) => void;
}

interface TagsInputState {
    tags: any;
    currentTagColorIndex: number;
    selectedTag: any;
    showModal: boolean;
}



const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default class TagsInput extends React.Component<TagsInputProps, TagsInputState> {
    

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            currentTagColorIndex: randomIntInRange(0, tagColors.length),
            selectedTag: {},
            showModal: false,
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);
        this.handleEditedTag = this.handleEditedTag.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }


    private handleAddition = (tag) => {
        tag.color = tagColors[this.state.currentTagColorIndex];

        this.addHtml(tag);
        this.setState(prevState => {
            return {
                tags: [...this.state.tags, tag],
                currentTagColorIndex: (prevState.currentTagColorIndex + 1) % tagColors.length
            }            
        }, () => this.props.onChange(JSON.stringify(this.state.tags)));
    }

    private handleTagClick(event){
        const tag = this.getTag(event.currentTarget.innerText)
        this.setState({
            selectedTag: tag,
            showModal: true
        })

    }

    private handleEditedTag(newTag){
        if(newTag.id !== this.state.selectedTag.id && this.state.tags.some(t => t.id === newTag.id)){
            //show error message and return
            return;
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
        }, () => this.props.onChange(this.state.tags));
    }

    handleCloseModal(){
        this.setState({
            showModal: false
        })
    }

    private handleDrag(tag, currPos, newPos){
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags },
            () => this.props.onChange(JSON.stringify(this.state.tags)));
    }


    private handleDelete (i){
        const { tags } = this.state;
        this.setState(prevState => {
            return {
                tags: tags.filter((tag, index) => index !== i)
            }
        }, () => this.props.onChange(this.state.tags));
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

    private addHtml(tag){
        tag.text = 
            <div className="inline-block" onDoubleClick={this.handleTagClick}>
                <div className={"inline-block box " + tag.color}></div>
                <span className="tag-text">{tag.id}</span>
            </div>
    }

    private convertToFlatList(tags) {
        return tags.map(element => element.id).join();
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
                <TagEditorModal 
                    tag={this.state.selectedTag}
                    showModal={this.state.showModal}
                    onOk={this.handleEditedTag}
                    onCancel={this.handleCloseModal}
                />
            </div>
        )
    }

}