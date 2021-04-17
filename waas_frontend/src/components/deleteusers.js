import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import store from 'store';
import './body.css'
import Home from "./home";
import {Button, Form} from "react-bootstrap";
import {NotificationContainer, NotificationManager} from "react-notifications";


class Deleteusers extends Component
{
    constructor(props)
    {
        super(props)
        this.state={
            users:[],
            deluser:'',
            DeleteUsers:[],
            checkCount: 0,
            checkboxValid:false,
            not:true
        }

        this.onChange= this.onChange.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
    }

    componentDidMount()
    {
        const apiUrl = 'http://localhost:8080/users';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((res) =>
            {
                if(res === null)
                {
                    this.setState({not: false})
                }
                else
                {
                    this.setState({users: res})
                }
            }).catch(err => console.log(err))
    }

    onChange(event)
    {
        var joined
        if(event.target.checked)
        {
                this.setState((prevState) => ({checkCount: prevState.checkCount + 1}))
                joined = this.state.DeleteUsers.concat(event.target.value);
                this.setState({DeleteUsers: joined})
                console.log(this.state.DeleteUsers)
        }
        else {
            this.setState((prevState) => ({checkCount: prevState.checkCount - 1}))
                joined = this.state.DeleteUsers.splice(-1,1);
                this.setState({DeleteUsers: joined})
                console.log(this.state.DeleteUsers)
            }

    }


    onSubmit(event)
    {
        //event.preventDefault()
        var st = this.state.DeleteUsers
        if (this.state.checkCount === 0) {
            // this.setState({checkboxValid: true})
            this.setState({ not: false});

        }
         else {
            var final = {DeleteIDs: (st)}
            console.log(JSON.stringify(final))

            fetch('/users', {
                method: 'DELETE',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(final)
            })
                .then(res => res.text()) // or res.json()
                .then(res => NotificationManager.success(res,'dd'))
            //NotificationManager.success('hv', 'Successfully Deleted!');



            event.target.reset();
        }

    }

    render() {
        const {users}=this.state;
        return (
            <div className="page-holder bg-cover" style={{backgroundColor: '#c2eaba',
                backgroundImage: 'linear-gradient(319deg, #c2eaba 0%, #c5f4e0 37%, #efc2cf 100%)'}}>

                <NotificationContainer />


                <br/><br/><br/><br/>

            <div className="card box_shw2 border-0 px-3 rounded-2 mb-3 w_500 py-4 mx-auto mt-5">

                            <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h1 >Delete Users</h1>
                       <hr/>


                        {this.state.not ?<label>Choose Users to Delete</label> : <p style={{color: "red"}}>No users exist </p>}


                        <Form.Group id="formGridCheckbox">
                            {this.state.users.map(item => (
                            <Form.Check data-testid="checkbox" type="checkbox" label={item.username} key={item.uid} value={item.uid} onClick={this.onChange}/>
                                ))}
                        </Form.Group>




                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Delete Users</button>

                </form>
                <br/><hr/>
                <p className=" text-right">
                    <a href="/">Go Back</a>
                </p>


            </div>
            </div>
        );
    }
}

export default Deleteusers