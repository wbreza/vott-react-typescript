import React from 'react'
import './tagsInput.scss'
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
    }

    convertToFlatList(tags) {
        return tags.map(element => element.text).join();
    }

    addHtml(tag){
        var color = "color-" + this.state.currentTagColor;
        var html = <span className={color}>{tag.text}</span>
        tag.text = html;
    }

    handleAddition = (tag) => {
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