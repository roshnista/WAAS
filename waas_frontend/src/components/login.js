import React, { Component } from "react";
import {Userid} from "./Userid";


// const required = (val) => val && val.length;
// const maxLength= (len) => (val) => !(val) || (val.length <= len )
// const minLength= (len) => (val) => (val) && (val.length >= len )
// const isNumber = (val) => !isNaN(Number(val));
// const validEmail=(val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)

export var myId;

export default class Login extends Component
{
    constructor(props)
    {
        super(props);

        const token = localStorage.getItem("token")
        let loggedIn= true
        if(token == null)
        {
            loggedIn= false
        }

        this.state = {
            username:'',
            loggedIn,
            users:[],
            data:[],
            uid:'',
            not:true

        };

        this.onValueChange = this.onValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    // addNotification(message) {
    //     this.notificationDOMRef.addNotification( {
    //         title: "Awesomeness",
    //         message:{message},
    //         type: "success",
    //         insert: "top",
    //         container: "top-right",
    //         animationIn: ["animated", "fadeIn"],
    //         animationOut: ["animated", "fadeOut"],
    //         dismiss: { duration: 2000 },
    //         dismissable: { click: true }
    //     });
    //
    // }

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
                    this.setState({data: res})
                }
            })
            .catch(err => console.log(err))

        console.log(this.state.users)
    }


    onValueChange(event) {
        this.setState({
            username : event.target.value,
            uid: event.target.id
        });
    }



    handleSubmit(event) {
        event.preventDefault();

        const username = this.state.username
            // return <Alert variant="success">not a valid login</Alert>
        const value = {username}
        console.log('Current State is: ' + JSON.stringify(value));

        const api = '/login';
        const request = {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(value)
        };



        if(this.state.username === '')
        {
            this.setState({ not: false});
        }
        else {
            fetch(api, request)
                .then((response) => (response.json()))
                .then(res => this.setState({data: res}))
                .then((data) => console.log('logged in'))
                .then(this.setState({loggedIn: true}))
                .then(localStorage.setItem("token", "abcd"))
                .catch(err => {
                    this.setState({errorMessage: err.message, not: false});
                })

        }

         console.log(this.state.data)

    }

    render() {
        const {users}=this.state;
        console.log(users)

        const username = this.state.username

        console.log(this.state.data);
        if(this.state.not === false)
        {
          // return <p>Not a user</p>
        }
        if(this.state.loggedIn === true)
        {

            this.props.history.push({
                pathname: '/home',
                data: [{
                    id: this.state.uid,
                    name: this.state.username,
                    d: this.state.data,
                    loggedIn: this.state.loggedIn
                }]
            })

            myId=this.state.uid
            console.log(myId)


        }


        console.log(this.state.not);



        return (
                <div className="page-holder bg-cover" style={{backgroundColor: '#c2eaba',
                    backgroundImage: 'linear-gradient(319deg, #c2eaba 0%, #c5f4e0 37%, #efc2cf 100%)'}}>

                            <br/><br/><br/><br/>
                    <div className="card box_shw2 border-0 px-3 rounded-2 mb-3 w_500 py-4 mx-auto mt-5">
                        <h3>Current Users</h3>
                        <hr/>
                        <div className="form-group">

                            <label><b>Choose a user to Login</b></label>


                        <form onSubmit={this.handleSubmit}>
                        <br/>

                            {this.state.not ?

                                <div>
                                {

                                    this.state.data.map(item => (

                                        <div className="radio" key={item.uid}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="radio"
                                                    required="required"
                                                    value={item.username}
                                                    id={item.uid}
                                                    onChange={this.onValueChange}
                                                />

                                                <span> {item.username}  </span>
                                                {/*<span className="second-word-formatting"> {item.name}</span>*/}
                                            </label>

                                        </div>
                                    ))

                                }
                                </div>
                                :
                                <p style={{color: "red"}}>No users exist</p>
                            }
                                <br/>
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                                <br/>

                            <p className=" text-right">
                                <a href="/">Go Back</a>
                            </p>
                            </form>
                        </div>
            </div>
            </div>
        );
    }
}



