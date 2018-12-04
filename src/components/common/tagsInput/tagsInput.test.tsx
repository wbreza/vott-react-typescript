import React from "react";
import TagsInput from "./tagsInput";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import TagColors from "./tagColors.json";

describe("Tags Input Component", () => {
    let wrapper: any = null;
    let onChangeHandler: (value: any) => void;
    const originalTags = [
        {
            id: "Tag1",
            color: "blue",
        },
        {
            id: "Tag2",
            color: "red",
        },
    ];

    beforeEach(() => {
        onChangeHandler = jest.fn();

        wrapper = mount(
            <TagsInput
                tags={originalTags}
                onChange={onChangeHandler}/>,
        );
    });

    it("tags are initialized correctly", () => {
        const stateTags = wrapper.state().tags;
        expect(stateTags).toHaveLength(originalTags.length);
        for (let i = 0; i < stateTags.length; i++) {
            expect(stateTags[i].id).toEqual(originalTags[i].id);
            expect(stateTags[i].color).toEqual(originalTags[i].color);
            expect(stateTags.text).not.toBeNull();
        }
    });

    it("one text input field is available", () => {
        expect(wrapper.find("input")).toHaveLength(1);
    });

    it("create a new tag from text box", () => {
        const newTagName = "My new tag";
        wrapper.find("input").simulate("change", {target: {value: newTagName}});
        wrapper.find("input").simulate("keyDown", {keyCode: 13});
        expect(onChangeHandler).toBeCalled();
        expect(wrapper.state().tags).toHaveLength(3);
        expect(wrapper.state().tags[2].id).toEqual(newTagName);
        expect(TagColors).toContain(wrapper.state().tags[2].color);
    });

});
