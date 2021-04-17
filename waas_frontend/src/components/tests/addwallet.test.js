import React from "react";
import ReactDOM from 'react-dom';
import Register from "../register";

import Enzyme,{ shallow,mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import AddModal from "../addwallet";



Enzyme.configure({adapter:new Adapter()});

test('Submit button ', () => {
    const wrapper = mount(<AddModal/>);
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.prop('type')).toEqual('submit');
    expect(button.text()).toEqual('Login');
});



test('amount', () => {


    const wrapper = mount(<Register/>);

    const label = wrapper.find('label').at(0);
    expect(label).toHaveLength(1);
    //expect(label.prop('htmlFor')).toEqual('username');
    expect(label.text()).toEqual('User name');

    const input1 = wrapper.find('input').at(0);
    expect(input1).toHaveLength(1);
    expect(input1.prop('type')).toEqual('text');
    expect(input1.prop('name')).toEqual('username');
});

test("wallet added" , () => {
    const wrapper = shallow(<Register/>);
    let prevented = false;

    wrapper.find("form").simulate("submit",{
        preventDefault:()=>{
            prevented=true;
        }
    });
    expect(prevented).toBe(true);
});
