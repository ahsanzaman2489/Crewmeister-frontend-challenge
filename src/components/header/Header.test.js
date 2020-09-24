import React from 'react';
import {shallow} from 'enzyme';
import Header from './Header';
import renderer from "react-test-renderer";

const setup = (props = {}, state = null) => {
    const defaultProps = {};
    const setUpProps = {...defaultProps, ...props};
    const wrapper = shallow(<Header {...setUpProps}/>);
    const tree = () => renderer.create(<Header {...setUpProps}/>).toJSON();
    if (state) wrapper.setState(state);
    return {wrapper, props: setUpProps, tree};
};

describe("Header component", () => {
    it('should match with snapshot', () => {
        const {tree} = setup();
        expect(tree()).toMatchSnapshot();
    });

    it('Should contain header tag', () => {
        const {wrapper} = setup();
        expect(wrapper.find("header").length).toBe(1);
    });

    it('Should contain company title with strong tag', () => {
        const {wrapper} = setup();
        expect(wrapper.find("strong").html()).toBe("<strong>Crewmeister frontend coding challenge</strong>");
    });

});