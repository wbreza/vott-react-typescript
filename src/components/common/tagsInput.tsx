import React from 'react'
import './tagsInput.scss'
import './tagColors.scss'
import { WithContext as ReactTags } from 'react-tag-input';
import { randomIntInRange } from "../../common/utils"


interface TagsInputProps {
    tags: any;
    onChange: (value) => void;
}

interface TagsInputState {
    tags: any;
    currentTagColor: number;
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
            currentTagColor: randomIntInRange(0, this.numberOfColors)
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);
    }

    convertToFlatList(tags) {
        return tags.map(element => element.id).join();
    }

    getEditedTag(){
        return {
            id: "Test Tag",
            text: "Test Tag",
            color: "color-14"
        }
    }

    getIndexOfTag(tagName){
        const {tags} = this.state;
        var i;
        for(i = 0; i < tags.length; i++){
            if (tags[i].id === tagName) {
                return i;
            }
        }
        return -1;
    }

    handleTagClick(event){
        var tagName = event.currentTarget.innerText;

        // Todo get index of current tag

        var newTag = this.getEditedTag();
        this.addHtml(newTag);
        const { tags } = this.state;

        var index = this.getIndexOfTag(tagName);

        




        this.setState(prevState => {
            return {
                tags: [
                    newTag,
                    ...prevState.tags.filter(tag => tag.id !== tagName)
                ],
                currentTagColor: prevState.currentTagColor
            } 
        }, () => this.props.onChange(this.convertToFlatList(this.state.tags)));
    }

    addHtml(tag){
        tag.text = 
            <div className="inline-block" onDoubleClick={this.handleTagClick}>
                <div className={"inline-block box " + tag.color}></div>
                <span className="tag-text">{tag.id}</span>
            </div>
        //<span >{tag.id} <span className={boxClass} onDoubleClick={this.handleClick}>    </span></span>
    }

    handleAddition = (tag) => {
        tag.color = "color-" + this.state.currentTagColor;

        this.addHtml(tag);
        this.setState(prevState => {
            return {
                tags: [...this.state.tags, tag],
                currentTagColor: (prevState.currentTagColor + 1) % this.numberOfColors
            }            
        }, () => this.props.onChange(this.convertToFlatList(this.state.tags)));
    }

    handleDelete (i){
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        }, () => this.props.onChange(this.convertToFlatList(this.state.tags)));
    }

    handleDrag(tag, currPos, newPos){
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
            </div>
        )
    }

}