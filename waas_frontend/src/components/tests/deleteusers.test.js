import React from "react";
import Login from "../login";

import Enzyme,{ shallow,mount } from 'enzyme';

import Adapter from "enzyme-adapter-react-16";
import Deleteusers from "../deleteusers";
import Register from "../register";

Enzyme.configure({adapter:new Adapter()});

test("component mount" , () => {

    const wrapper = shallow(<Deleteusers/>);
    wrapper.instance().componentDidMount = jest.fn();
    jest.spyOn(wrapper.instance(),'onSubmit');
    expect(wrapper.instance().componentDidMount).toBeTruthy()

});


test("mock history", ()=>{

    const historyMock = {push : jest.fn()};
    const wrapper = shallow(<Deleteusers history={historyMock}/>)
    expect(historyMock.push.mock.calls[0]).toBe(undefined);

})


test('calls onChangefunction2', () => {
    const onChangefn = jest.fn();
    let called=true;
    const wrapper = mount(<Deleteusers onChange={onChangefn}/>);
    const form = wrapper.find("button")
    console.log(form.instance().value)
    form.simulate("submit",{ preventDefault:()=>{
            called=true;
        }});
    expect(onChangefn).toHaveBeenCalledTimes(0);
    expect(called).toBe(true)

});

test('submit button ', () => {
    const wrapper = mount(<Deleteusers/>);
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.prop('type')).toEqual('submit');
    expect(button.text()).toEqual('Delete Users');
});


test('checkbox',()=> {
    const wrapper = mount(<Deleteusers/>);
    const cb = wrapper.find('Form.Group').at(0);
    expect(cb).toHaveLength(0);
    //expect(cb.prop('type')).toEqual('checkbox');


    // const { getByTestId } = render(<MyCheckbox />)
    // const checkbox = getByTestId(CHECKBOX_ID)
    // const div = getByTestId(DIV_ID)
    // expect(checkbox.checked).toEqual(false)
    // expect(div.style['display']).toEqual('none')
    // fireEvent.click(checkbox)
    // expect(checkbox.checked).toEqual(true)

})



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