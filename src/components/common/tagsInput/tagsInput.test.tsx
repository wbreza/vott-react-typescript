import React from "react";
import TagsInput from "./tagsInput";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";

describe("Tags Input Component", () => {
    let wrapper: any = null;
    let onChangeHandler: (value: any) => void;

    beforeEach(() => {
        const tags = [
            {
                id: "Tag1",
                color: "blue",
            },
            {
                id: "Tag2",
                color: "red",
            },
        ];

        onChangeHandler = jest.fn();

        wrapper = mount(
            <TagsInput
                tags={tags}
                onChange={onChangeHandler}/>,
        );
    });

    it("does something", () => {
        expect(wrapper).not.toBeNull();
    });
});
