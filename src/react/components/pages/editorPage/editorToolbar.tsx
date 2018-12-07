import React from "react";
import "./tagsInput.scss";
import "../common.scss";
import deepmerge from "deepmerge";
import { connect } from "tls";

export default class EditorToolbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleEditedTag = this.handleEditedTag.bind(this);
    }

    public render() {
        // const { tags } = this.state;
        return (
            <div>
                <button></button>
            </div>
        );
    }

    public handleEditedTag(): void {
        // const newReactTag = this.toReactTag(newTag);
        // if (newReactTag.id !== this.state.selectedTag.id && this.state.tags.some((t) => t.id === newReactTag.id)) {
        //     return;
        // }
        // this.addHtml(newReactTag);
        // this.setState((prevState) => {
        //     return {
        //         tags: prevState.tags.map((reactTag) => {
        //             if (reactTag.id === prevState.selectedTag.id) {
        //                 reactTag = newReactTag;
        //             }
        //             return reactTag;
        //         }),
        //         showModal: false,
        //     };
        // }, () => this.props.onChange(this.normalize(this.state.tags)));
    }

    private handleCloseModal(): void {
        this.setState({
            showModal: false,
        });
    }
}
