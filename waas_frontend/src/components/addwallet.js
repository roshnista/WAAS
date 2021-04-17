import React, {Component} from "react";
import {Form ,Modal ,Col ,Row ,Button} from 'react-bootstrap';
import Home from "./home";
import {NotificationContainer, NotificationManager} from "react-notifications";

class AddModal extends Component{
    constructor(props) {
        super(props);

        this.state={
            walletname:'',
            u_id:this.props.location.id,
            username:this.props.location.name,
            loggedin:this.props.location.loggedin,
            data:this.props.location.data,
            home:false,
            errorMessage:''
        }

        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack=this.goBack.bind(this);
    }


    componentDidMount()
    {

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

    onChange(e)
    {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const {walletname} = this.state
        const value = {walletname}
        console.log('Current State is: ' + JSON.stringify(value));

        const apiUrl = '/wallet/'+this.state.u_id;
        console.log(apiUrl)
        const requestOptions = {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(value)
        };


        fetch(apiUrl, requestOptions)
            .then(res => {
            if(res.ok)
            {
                this.setState({errorMessage : ''})
                NotificationManager.success('', 'Wallet Successfully Created!');
            }
            else
            {
                res.json().then(body => {
                    NotificationManager.error('', body.error_message );
                })
            }
        })
        e.target.reset();
        this.componentDidMount()
    }

    goBack(e)
    {
        this.props.history.push({
            pathname: '/home',
            data:[{ id:this.state.u_id , name :this.state.username }]// your data array of objects
        })

    }

    render() {

        if(this.state.home)
        {
            console.log(this.state.username , this.state.loggedIn  ,this.state.data)
            return <Home username={this.props.username} loggedIn={this.props.loggedIn} data={this.state.data} />
        }
        console.log(this.state.errorMessage)

        return (
                    <div  className="page-holder bg-cover" style={{backgroundColor: '#c2eaba',
                        backgroundImage: 'linear-gradient(319deg, #c2eaba 0%, #c5f4e0 37%, #efc2cf 100%)'}}>
                        <NotificationContainer />
                        <br/><br/><br/><br/>
                        <div className="card box_shw2 border-0 px-3 rounded-2 mb-3 w_500 py-4 mx-auto mt-5" >
                        <h1>Add Wallet </h1>
                            <hr/>
                        <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Wallet Name</label>
                            <input type="text" className="form-control" placeholder="Enter wallet name"
                                   name="walletname"  required="required" value={this.state.walletname} onChange={this.onChange}/>
                        </div>


                        <button type="submit" className="btn btn-primary btn-block">Add Wallet</button>
                        </form>
                            <br/><br/>
                            <p className=" text-right">
                                <Button className="btn-primary" onClick={this.goBack}>Go Back</Button>
                            </p>
                        </div>
                    </div>

        )
    }

}

export default AddModal