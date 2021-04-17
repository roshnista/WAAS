import React from "react";
import ReactDOM from 'react-dom';
import Home from "../home";
import Enzyme,{ shallow,mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import Credit from "../credit";

Enzyme.configure({adapter:new Adapter()});

describe("Home component", () => {

    it('should exist' ,() => {
        const component = shallow(<Home/>);
        component.setProps({
            username:'roshni',
            loggedIn:true,
            uid:'43467ywghj12'
        })
        component.instance().componentDidMount=jest.fn();
        expect(component.instance().componentDidMount).toBeTruthy();
        expect(component).toBeTruthy();
    })
})

describe("Home component", () => {

    it('should exist' ,() => {

        const historyMock = { push: jest.fn() };
        const component= shallow(<Home history={historyMock} />)
        expect(historyMock).toHaveBeenCalledTimes(1);
        // expect(historyMock.push.mock.calls[0]).toEqual(undefined);
        // expect(component.instance().componentDidMount).toBeTruthy();
        // expect(component).toBeTruthy();
    })

})


// describe('Parent Component', () => {
//         it('renders Child component', () => {
//
//             const wrapper = shallow(<Home />);
//             wrapper.setProps( {
//                 username:'roshni',
//                 loggedIn:true,
//                 uid:'ewewre12'
//             })
//             expect(wrapper.containsMatchingElement(<Credit/>)).toEqual(true);
//         });
//     });
//
