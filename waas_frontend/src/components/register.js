import React, { Component } from "react";
import  './register.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer,NotificationManager} from "react-notifications";


const initialState ={
    username:'',
    name:'',
    age: '',
    contact:'',
    password:'',
    kycdetails:'',
    registered:false,
    errorMessage:''
}
class Register extends Component
{
    state = initialState
    constructor(props)
    {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(e)
    {
        this.setState({
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
            errorMessage:''
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const { username , name , age, contact ,password , kycdetails} = this.state
        const value = { username , name , age, contact , kycdetails }
        console.log('Current State is: ' + JSON.stringify(value));

        const apiUrl = '/users';
        const requestOptions = {
            method: 'POST',
            headers: { 'Accept':'application/json','Content-Type': 'application/json' },
            body: JSON.stringify(value)
        };



        fetch(apiUrl,requestOptions)
            .then(response=> {
                if (response.status === 400)
                {
                    response.json().then((object) => {
                       {this.setState( {errorMessage:"User Name already exists" } )}
                    })
                }
                else{
                    response.json().then((object)=> {
                        {
                            this.setState(
                                {
                                    username:'',
                                    name:'',
                                    age: '',
                                    contact:'',
                                    password:'',
                                    kycdetails:'',
                                    registered:true,
                                    errorMessage:''
                                })
                            NotificationManager.success(<a href="/login">'Go to Login Page'</a>, 'User Successfully Created!');


                        }
                    })
                }
            })

        console.log(this.state.errorMessage)

    }



    render() {

        return (
            <div  className="page-holder " style={{backgroundColor: '#c2eaba',
                backgroundImage: 'linear-gradient(319deg, #c2eaba 0%, #c5f4e0 37%, #efc2cf 100%)'}}><br/><br/>
                <NotificationContainer />
                <div className="card box_shw2 border-0 px-3 rounded-2 mb-3 w_500 py-4 mx-auto mt-5">

                <form className="form" onSubmit={this.handleSubmit}>

                <h4>Add New User</h4>

                <div className="form-group">


                        <label >User name</label>
                        <input type="text" className="form-control" placeholder="username"  name="username" required="required"  value={this.state.username}  onChange={this.onChange}/>
                    <div className="error" style={{color:'red'}}>{this.state.errorMessage} </div>
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder="name" name="name"  required="required" value={this.state.name} onChange={this.onChange}/>


                        <label>Age</label>
                        <input type="number" className="form-control" placeholder="Enter age" name="age" required="required" min="1" value={this.state.age} onChange={this.onChange}/>

                        <label>Contact</label>
                        <input type="text" pattern="[0-9]*"  className="form-control" placeholder="Enter number" name="contact" required="required" value={this.state.contact} onChange={this.onChange}/>

                        <label>KYC Details</label>
                        <input type="text" className="form-control" placeholder="enter kyc number" name="kycdetails"  required="required" value={this.state.kycdetails} onChange={this.onChange}/>


                </div>

                <button type="submit" className="submit btn btn-primary btn-block">Create User</button>
                    <p className=" text-right">
                        <a href="/">Go Back</a>
                    </p>

                </form>
                </div>


            </div>
        );
    }
}
export default Register;
