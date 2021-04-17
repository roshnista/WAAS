import React ,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Nav, Navbar, NavbarBrand, NavbarToggler,NavItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import './navi.css';

class Navi extends Component
{
        constructor(props) {
        super(props);
        localStorage.removeItem("token")
        }

    render()
    {

    return (
        <div>
            <Navbar className="fixed-top" dark expand="md">
                <div className="container-fluid">
                    <NavbarToggler/>
                    <NavbarBrand className="mr-auto" href="/"><h3>Wallet as a Service</h3></NavbarBrand>
                    <Nav navbar className="ml-auto">
                        <NavItem>
                            <NavLink className="nav-link" to='/'><span
                                className="fa fa-home fa-lg"></span> </NavLink>
                        </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" to='/'><div style={{color:"gray"}}> <span
                                    className="fa fa-sign-out fa-lg"></span></div>
                                </NavLink>
                            </NavItem>


                    </Nav>
                </div>
            </Navbar>
        </div>
    );
    }
}
;
export default Navi
