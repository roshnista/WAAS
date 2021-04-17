import React from "react";
import ReactDOM from 'react-dom';
import Debit from "../debit";
import Enzyme,{ shallow,mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import Credit from "../credit";

Enzyme.configure({adapter:new Adapter()});

describe("Debit component", () => {

    it('should exist', () => {
        const component = shallow(<Debit/>);
        component.instance().componentDidMount = jest.fn();
        expect(component.instance().componentDidMount).toBeTruthy();
        expect(component).toBeTruthy();
    })


    it("form submitted", () => {
        const wrapper = shallow(<Debit id="1"/>);
        let prevented = false;

        expect(wrapper.instance().state.uid).toBe(undefined)

        wrapper.find("form").simulate("submit", {
            preventDefault: () => {
                prevented = true;
            }
        });
        expect(prevented).toBe(true);
    });
})



test('renders text input with label', () => {


    const wrapper = mount(<Debit/>);

    const label = wrapper.find('label').at(0);
    expect(label).toHaveLength(1);
    //expect(label.prop('htmlFor')).toEqual('username');
    expect(label.text()).toEqual('amount');

    const input1 = wrapper.find('input').at(0);
    expect(input1).toHaveLength(1);
    expect(input1.prop('type')).toEqual('text');
    expect(input1.prop('name')).toEqual('amount');


    wrapper.find("input").simulate("change" , {
        target: {value: "hello"}
    });

    expect(wrapper.find("input").props.value).toEqual("hello");
});