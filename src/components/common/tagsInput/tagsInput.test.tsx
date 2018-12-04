import React from "react";
import TagsInput from "./tagsInput";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import TagColors from "./tagColors.json";
import { inspect } from "util";

describe("Tags Input Component", () => {
    let wrapper: any = null;
    let onChangeHandler: (value: any) => void;
    let ref;

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
        ref = React.createRef<TagsInput>();
        wrapper = mount(
            <TagsInput
                tags={originalTags}
                onChange={onChangeHandler}
                ref={ref}/>,
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

    it("renders appropriate color boxes", () => {
        expect(wrapper.find("div.inline-block.box.blue")).toHaveLength(1);
        expect(wrapper.find("div.inline-block.box.red")).toHaveLength(1);
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

    it("remove a tag", () => {
        wrapper.find("a.ReactTags__remove").last().simulate("click");
        expect(onChangeHandler).toBeCalled();
        expect(wrapper.state().tags).toHaveLength(1);
        expect(wrapper.state().tags[0].id).toEqual(originalTags[0].id);
        expect(wrapper.state().tags[0].color).toEqual(originalTags[0].color);
    });

    it("double click tag opens modal", () => {
        expect(wrapper.state().showModal).toBeFalsy();
        wrapper.find("div.inline-block.tagtext")
            .first().simulate("dblclick", { target: { innerText: originalTags[0].id}});
        expect(wrapper.state().showModal).toBeTruthy();
    });

    it("double click tag sets selected tag", () => {
        wrapper.find("div.inline-block.tagtext")
            .first().simulate("dblclick", { target: { innerText: originalTags[0].id}});
        expect(wrapper.state().selectedTag.id).toEqual(originalTags[0].id);
        expect(wrapper.state().selectedTag.color).toEqual(originalTags[0].color);
        wrapper.find("button").last().simulate("click");
        expect(wrapper.state().showModal).toBeFalsy();
        expect(onChangeHandler).toBeCalled();
    });

    it("clicking 'ok' in modal closes and calls onChangeHandler", () => {
        wrapper.find("div.inline-block.tagtext")
            .first().simulate("dblclick", { target: { innerText: originalTags[0].id}});
        wrapper.find("button").last().simulate("click");
        expect(wrapper.state().showModal).toBeFalsy();
        expect(onChangeHandler).toBeCalled();
    });

    it("clicking 'cancel' in modal closes and does not call onChangeHandler", () => {
        wrapper.find("div.inline-block.tagtext")
            .first().simulate("dblclick", { target: { innerText: originalTags[0].id}});
        wrapper.find("button").first().simulate("click");
        expect(wrapper.state().showModal).toBeFalsy();
        expect(onChangeHandler).not.toBeCalled();
    });
});
