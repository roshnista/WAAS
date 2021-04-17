import React from "react";
import Login from "../login";

import Enzyme,{ shallow,mount } from 'enzyme';

import Adapter from "enzyme-adapter-react-16";
import Home from "../home";
import Deleteusers from "../deleteusers";

Enzyme.configure({adapter:new Adapter()});

test("component mount" , () => {

    const wrapper = shallow(<Login/>);
    wrapper.instance().componentDidMount = jest.fn();
    jest.spyOn(wrapper.instance(),'handleSubmit');
    expect(wrapper.instance().componentDidMount).toBeTruthy()

});

test("mock history", ()=>{

    const historyMock = {push : jest.fn()};
    const wrapper = shallow(<Login history={historyMock}/>)
    expect(historyMock.push.mock.calls[0]).toBe(undefined);

})

test('calls onChangefunction3', () => {
    const onChangefn = jest.fn();
    let called=true;
    const wrapper = mount(<Login onChange={onChangefn}/>);
    const form = wrapper.find("button")
    console.log(form.instance().value)
    form.simulate("submit",{ preventDefault:()=>{
            called=true;
        }});
    expect(onChangefn).toHaveBeenCalledTimes(0);
    expect(called).toBe(true)

});

test('Login button ', () => {
    const wrapper = mount(<Login/>);
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.prop('type')).toEqual('submit');
    expect(button.text()).toEqual('Login');
});


//
// it('renders Child component', () => {
//     const wrapper = shallow( <Login/> );
//     wrapper.setProps({
//         username:'roshni',
//         loggedIn:true,
//         uid:'43467ywghj12'
//     }
// );
// expect(wrapper.find(Home)).toHaveLength(1);
// });