import React, {Component, useState} from "react";
import { ToggleButton , Button } from 'react-bootstrap';

import './home.css';
import {Link} from "react-router-dom";
import {Redirect} from "react-router";

class Home extends Component
{
    constructor(props) {
        super(props);

        let loggedIn,username='',uid

        this.state={
            username,
            loggedIn,
            data:[],
            uid,
            credit:false,
            debit:false,
            status:false,
            addwallet:false,
            delwallet:false
        };

        // const token = localStorage.getItem("token")
        // if(token == null)
        // {
        //     this.setState({loggedIn:false})
        // }

    }



    componentDidMount()
    {

        this.setState(
            {username:this.props.location.data[0].name,
                loggedIn:this.props.location.data[0].loggedIn,
                uid:this.props.location.data[0].id}
    )
        const username = this.state.username
        const value = {username}
        console.log('Current State is: ' + JSON.stringify(value));

        const api = '/login';
        const request = {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(value)
        };

        const apiUrl = 'http://localhost:8080/users/' + this.props.location.data[0].id;

        fetch(apiUrl)
            .then((response) => (response.json()))
            .then((res) =>
            {
                if(res === null)
                {
                    this.setState({ loggedIn:true})
                }
                else
                {
                    this.setState({data: res , loggedIn:true})
                }
            })
            .then(console.log(this.state.data))
            .then(localStorage.setItem("token","abcd"))
            .catch(err => console.log(err))

        console.log(this.state.data)
    }

    // HandleCredit(event){
    //     event.preventDefault();
    //     const df=this.props.data
    //     let uid="";
    //     df.map((postData) => {
    //         uid=postData.user_id
    //     })
    //     this.setState({credit:true , uid:uid});
    // }
    //
    // HandleDebit(event){
    //     event.preventDefault();
    //     const df=this.props.data
    //     let uid="";
    //     df.map((postData) => {
    //         uid=postData.user_id
    //     })
    //     this.setState({debit:true , uid:uid});
    // }
    //
    // HandleStatus(event){
    //     event.preventDefault();
    //     const df=this.props.data
    //     let uid="";
    //     df.map((postData) => {
    //         uid=postData.user_id
    //     })
    //     this.setState({status:true , uid:uid});
    // }
    //
    // HandleAdd(event){
    //     event.preventDefault();
    //     const df=this.props.data
    //     let uid="";
    //     df.map((postData) => {
    //         uid=postData.user_id
    //     })
    //     this.setState({addwallet:true , uid:uid});
    // }
    //
    // HandleDel(event){
    //     event.preventDefault();
    //     const df=this.props.data
    //     let uid="";
    //     df.map((postData) => {
    //         uid=postData.user_id
    //     })
    //     this.setState({delwallet:true , uid:uid});
    // }


    render()
    {

        const {data} = this.state;

        console.log(this.state.loggedIn)
        if(this.state.loggedIn === false)
        {
            return <Redirect to='/'/>
        }
        // console.log(this.props.location)
        // console.log(this.props.location.data[0].id)
        // console.log(this.state.data)
        // console.log(this.props.location.data[0].name)
        // console.log(this.props.location.data[0].data)
        // //console.log(this.props.location.state.id)



       // console.log(data, ud, n)
        // if(this.state.loggedIn === false) {
        //     return <Redirect to="/"/>
        // }

        let i=0
        // if(this.state.credit ===true )
        // {
        //     return <Credit username={this.state.username} loggedIn={this.state.loggedIn} id={this.state.uid} data={this.props.data} />
        // }
        // else if(this.state.debit ===true )
        // {
        //     return <Debit username={this.state.username} loggedIn={this.state.loggedIn} id={this.state.uid} data={this.props.data} />
        // }
        // else if(this.state.status ===true )
        // {
        //     return <Status username={this.state.username} loggedIn={this.state.loggedIn} id={this.state.uid} data={this.props.data} />
        // }
        // else if(this.state.addwallet ===true )
        // {
        //     return <AddModal username={this.state.username} loggedIn={this.state.loggedIn} id={this.state.uid} data={this.props.data} />
        // }
        // else if(this.state.delwallet ===true )
        // {
        //     return <DelModal username={this.state.username} loggedIn={this.state.loggedIn} id={this.state.uid} data={this.props.data} />
        // }


                return(
                <div className="bg-cover page-holder bg-transparent" style={{backgroundColor: '#c2eaba',
                    backgroundImage: 'linear-gradient(319deg, #c2eaba 0%, #c5f4e0 37%, #efc2cf 100%)'}}>


                    <div className="text-right mr-2">
                        <br/><br/><br/>
                        <b>Welcome , {this.state.username} </b>
                        <br/>
                        {/*    /!*<button type="button" className="btn green btn-secondary" onClick={this.handleDelete.bind(this)}>Delete User</button>*!/*/}


                        {(data.length > 0) &&
                        <b>Your current wallets are: </b>  }
                            <br/>

                        <div className="btn-group" role="group" aria-label="Basic example" key={i++}>

                        {data.map((postData) => {
                                return (
                                    <div className="btn-group" role="group" aria-label="Basic example" key={i++}>

                                        {(postData.is_active) ?
                                        <button type="button" className="btn green btn-secondary">{postData.wallet_name}</button> :


                                        <button type="button" className="btn green btn-secondary" disabled="disabled">{postData.wallet_name}</button>
                                        }
                                    </div>
                                );
                            })}

                        </div>
                        <br/><br/>
                    </div>


                    <div className="main-block text-center " >
                        <header><h1><b>Choose a Service</b></h1></header>
                        <br/>
                        <div >
                            <div className="row justify-content-center">
                                <div className="col-auto">

                                    <table  width="600" height="200" cellPadding="30" cellSpacing="20" >
                                        <thead>
                                        <tr>
                                            <td>
                                                <Link to={{ pathname: "/credit", id:this.state.uid , name:this.state.username , data:this.state.data , loggedIn: this.state.loggedIn}}><Button className="btn btn-block green" variant="secondary" size="lg" >Credit Amount</Button></Link>
                                            </td>
                                            <td>
                                                <Link to={{ pathname: "/debit", id:this.state.uid , name:this.state.username , data:this.state.data , loggedIn: this.state.loggedIn}}><Button className="btn btn-block green" variant="secondary" size="lg" >Debit Amount</Button></Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Link to={{ pathname: "/addwallets", id:this.state.uid , name:this.state.username , data:this.state.data , loggedIn: this.state.loggedIn}}><Button className="btn btn-block green"  variant="secondary" size="lg" >Add Wallet</Button></Link>
                                            </td>
                                            <td>
                                                <Link to={{ pathname: "/delwallets", id:this.state.uid , name:this.state.username , data:this.state.data , loggedIn: this.state.loggedIn}}><Button className="btn btn-block green"  variant="secondary" size="lg">Delete Wallet</Button></Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2">
                                                <Link to={{ pathname: "/status", id:this.state.uid , name:this.state.username , data:this.state.data , loggedIn: this.state.loggedIn}}><Button className="btn " variant="secondary green" size="lg">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Manage Wallet Status&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Button> </Link>
                                            </td>

                                        </tr>
                                        </thead>

                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                )

  }


}
export default Home;
