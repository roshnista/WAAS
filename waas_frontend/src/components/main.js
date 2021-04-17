import React, {Component, useState} from "react";
import {Router, Route, Link, withRouter, Switch} from "react-router-dom";

import history from '../history';
import Navi from "./Navi";
import Body from "./body";
import Login from "./login";
import Register from "./register";
import Home from "./home";
import Debit from "./debit";
import Credit from "./credit";
import Status from "./status";
import Statement from "./statement";
import Default from "./default";
import Footer from "./footer";
import Deleteusers from "./deleteusers";
import AddModal from "./addwallet";
import DelModal from "./deleteWallets";


class Main extends Component
{

    constructor(props) {
        super(props);

        this.state =
            {
                username:'',
                loggedIn:false,
                users:[],
                data:[]
            };
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
    }


    logIn(api,request)
    {
        fetch(api, request)
            .then((response) => (response.json()))
            .then(res => this.setState({data: res}))
            .then((data) => console.log('logged in'))
            .then(this.setState({loggedIn: true}))
            .then(localStorage.setItem("token", "abcd"))
            .catch(err => {
                this.setState({errorMessage: err.message, not: false});
            })

        console.log(this.state.loggedIn)

    }

    logOut() {
        this.setState({loggedIn: false});
    }


    render() {

        return(

                <div className="App">


                    <Router history={history}>

                        <Navi loggedIn={this.state.loggedIn} logout={this.logout} />

                        <Route exact path='/' component={Body} />y
                        <Route path='/login'  component={Login}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/home' component={Home}/>
                        <Route path='/debit' component={Debit}/>
                        <Route path='/credit' component={Credit}/>
                        <Route path='/addwallets' component={AddModal}/>
                        <Route path='/delwallets' component={DelModal}/>
                        <Route path='/status' component={Status}/>
                        <Route path='/default' component={Default}/>
                        <Route path='/deleteusers' component={Deleteusers}/>

                        <Footer/>

                    </Router>
                </div>
        )
    }



}
export default Main;