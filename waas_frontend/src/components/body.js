import React, { Component } from "react";
import './body.css'
import Home from "./home";
import {Button} from "react-bootstrap";


class Body extends Component
{
    constructor(props)
    {
        super(props)
        let loggedIn = false
        this.state = {
            username:'',
            loggedIn,
            users:[]
        };

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(e)
    {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount()
    {
        const apiUrl = 'http://localhost:8080/users';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {this.setState({users:data})})
            .catch(err => console.log(err))
    }


    handleSubmit(event) {

        event.preventDefault();
        const username = this.state.username


        const value = {username}
        console.log('Current State is: ' + JSON.stringify(value));

        const api= '/login';
        const request = {
            method: 'POST',
            headers: { 'Accept':'application/json','Content-Type': 'application/json' },
            body: JSON.stringify(value)
        };

        fetch(api,request)
            .then((response) => console.log(response))
            .then((data)=>console.log('logged in'))
            .then(this.setState({loggedIn:true}))
            .catch(err => console.log(err))


    }


    render()
    {
        const {users}=this.state;

        if(this.state.loggedIn)
        {
            return <Home user={this.state.username}/>
        }
        return(
            <div className="page-holder bg-cover" style={{backgroundColor: '#c2eaba',
                backgroundImage: 'linear-gradient(319deg, #c2eaba 0%, #c5f4e0 37%, #efc2cf 100%)'}}>
                <br/><br/>
                <div className="container py-5 ">
                    <header className="text-center text-grey py-5 animate__animated animate__fadeInUpBig ">
                        <h4 className="display-4 font-weight-bold mb-4">Wallet As A Service</h4>

                    </header>



                    <div className="row justify-content-center">
                        <div className="col-auto">
                    <table  width="400" height="200" cellPadding="30" cellSpacing="20" >
                        <thead>
                        <tr>
                            <td>
                                <a href={'/login'} ><Button className="btn btn-block green btn-xxl" variant="secondary" size="lg" >View Users</Button></a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href={'/register'} ><Button className="btn btn-block green btn-xxl" variant="secondary" size="lg">Add a new User</Button></a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href={'/deleteusers'} ><Button className="btn btn-block green btn-xxl"  variant="secondary" size="lg" >Delete Users</Button></a>
                            </td>
                        </tr>
                        </thead>
                    </table>
                        </div></div>
                </div>

            </div>
        )
    }
}
export default Body;