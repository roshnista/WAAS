import React, {Component} from "react";
import {Button} from 'react-bootstrap';

import AddModal from "./addwallet";
import DelModal from "./deleteWallets";

class Wallets extends Component
{
    constructor(props) {
        super(props)

        this.state={
            u_id:props.id,
            username:props.username,
            loggedIn:props.loggedIn,
            data:props.data,
            ModalShow:false,
            ModalShow2:false,
        }
    }

    componentDidMount() {
        const username = this.state.username
        const value = {username}
        console.log('Current State is: ' + JSON.stringify(value));

        const api = '/login';
        const request = {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(value)
        };

        fetch(api, request)
            .then((response) => (response.json()))
            .then(res => this.setState({data: res}))
            .then((data) => console.log('logged in'))
            .then(this.setState({loggedIn: true}))
            .then(localStorage.setItem("token","abcd"))
            .catch(err => console.log(err))



    }

render() {
    return (

        <div className="text-center page-holder bg-cover" style={{
            backgroundColor: '#c2eaba',
            backgroundImage: 'linear-gradient(319deg, #c2eaba 0%, #c5f4e0 37%, #efc2cf 100%)'
        }}>
            <br/><br/><br/><br/>
            <header>
                <h1><b> Manage Wallets </b></h1>
            </header>

            <header className="text-center text-white py-5">
                <div className="container">

                    <Button className="btn floatleft btn-xxl" onClick={() => this.setState({  ModalShow:true})} variant="secondary"
                            size="lg" style={{fontsize: '250px'}}>Add a Wallet</Button>

                    {console.log(this.state.ModalShow)}

                    <Button className="btn floatright btn-xxl" onClick={() => this.setState({ ModalShow2:true})} variant="secondary"
                            size="lg">Delete a Wallet</Button>


                    <AddModal
                        show={this.state.ModalShow}
                        onHide={() => this.setState({ ModalShow:false})}
                        username={this.state.username} loggedin={this.state.loggedIn} u_id={this.state.u_id} data={this.props.data}
                    />


                    <DelModal
                        show={this.state.ModalShow2}
                        onHide={() => this.setState({ ModalShow2:false})}
                        username={this.state.username} loggedin={this.state.loggedIn} u_id={this.state.u_id} data={this.props.data}
                    />

                </div>
            </header>
        </div>
    );

}
}
export default Wallets;