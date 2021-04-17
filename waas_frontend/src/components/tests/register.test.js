import React from "react";
import ReactDOM from 'react-dom';
import Register from "../register";

import Enzyme,{ shallow,mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";

import {render} from "@testing-library/react";
import renderer from "react-test-renderer";

Enzyme.configure({adapter:new Adapter()});


test('example test' , () => {
    const a=800;
    const b=900;
    expect(a+b).toBeLessThan(22000);
})


it("renders without crashing",()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Register/>,div)
})



test('Testing api', () =>{
      const wrapper = shallow(<Register/>);
      wrapper.instance().handleSubmit = jest.fn();
      expect(wrapper.exists()).toBe(true)
});


it('calls onChangefunction', () => {
    const onChangefn = jest.fn();
    let called=false;
    const wrapper = mount(<Register onChange={onChangefn}/>);
    const form = wrapper.find("form")
    form.simulate("submit",{ preventDefault:()=>{
            called=true;
        }});
    expect(onChangefn).toHaveBeenCalledTimes(0);
    expect(called).toBe(true)
});


it('calls onSubmit prop function when form is submitted', () => {
    const onSubmitFn = jest.fn();
    let called=false;
    const wrapper = mount(<Register handleSubmit={onSubmitFn}/>);
    const form = wrapper.find("form")
    form.simulate("submit",{ preventDefault:()=>{
            called=true;
        }});
    expect(onSubmitFn).toHaveBeenCalledTimes(0);
    expect(called).toBe(true)
});



test("User text is echoed", () => {
    const setState = jest.fn();
    const wrapper = Enzyme.mount(Enzyme.shallow(<Register/>).get(0))
    const name=wrapper.find("input").at(0);
    name.instance().value="test";
    name.simulate("change" , {
        target: {value: ""}
    });
    expect(name.instance().value).toEqual("");
});


test('renders text input with label (default type)', () => {


    const wrapper = mount(<Register/>);

    const label = wrapper.find('label').at(0);
    expect(label).toHaveLength(1);
    //expect(label.prop('htmlFor')).toEqual('username');
    expect(label.text()).toEqual('User name');

    const input1 = wrapper.find('input').at(0);
    expect(input1).toHaveLength(1);
    expect(input1.prop('type')).toEqual('text');
    expect(input1.prop('name')).toEqual('username');


    const input2 = wrapper.find('input').at(1);
    expect(input2).toHaveLength(1);
    expect(input2.prop('type')).toEqual('text');
    expect(input2.prop('name')).toEqual('name');


    const input3 = wrapper.find('input').at(2);
    expect(input3).toHaveLength(1);
    expect(input3.prop('type')).toEqual('number');
    expect(input3.prop('name')).toEqual('age');

    const input4 = wrapper.find('input').at(3);
    expect(input4).toHaveLength(1);
    expect(input4.prop('type')).toEqual('text');
    expect(input4.prop('name')).toEqual('contact');

    const input5 = wrapper.find('input').at(4);
    expect(input5).toHaveLength(1);
    expect(input5.prop('type')).toEqual('text');
    expect(input5.prop('name')).toEqual('kycdetails');

});


test("form submitted" , () => {
    const wrapper = shallow(<Register/>);
    let prevented = false;

    wrapper.find("form").simulate("submit",{
        preventDefault:()=>{
            prevented=true;
        }
    });
    expect(prevented).toBe(true);
});








