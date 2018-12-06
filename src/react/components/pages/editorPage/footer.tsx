import React from "react";
import TagsInput from "../../common/tagsInput/tagsInput";
import { ITag } from "../../../../models/applicationState";

interface IFooterProps {
    tags: ITag[];
    onChange: (value) => void;
}

interface IFooterState {
    tags: ITag[];
}

export default class Footer extends React.Component<IFooterProps, IFooterState> {
    constructor(props) {
        super(props);
        this.state = {
            tags: props.tags,
        };
        this.onTagsChange = this.onTagsChange.bind(this);
    }

    public render() {
        return (
            <div>
                <TagsInput
                    tags={this.state.tags}
                    onChange={this.onTagsChange}
                />
            </div>
        );
    }

    private onTagsChange(tags) {
        this.setState({
            tags: JSON.parse(tags),
        }, () => this.props.onChange(this.state));
    }
}
