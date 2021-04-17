import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import Home from "./home";

import {Redirect} from "react-router";
import {NotificationContainer, NotificationManager} from "react-notifications";

class Credit extends Component
{

    constructor(props) {
        super(props);

        let u_id=0;

        this.state={
            u_id:this.props.location.id,
            loggedIn:true,
            data: [],
            walletName:'',
            amount:'',
            home:false,
            not:true
        }

        this.onValueChange = this.onValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack=this.goBack.bind(this);
    }

    componentDidMount()
    {

        // const username = this.state.username
        // console.log(this.state.data)
        // const value = {username}
        // console.log('Current State is: ' + JSON.stringify(value));

console.log(this.state.u_id)
        const apiUrl = 'http://localhost:8080/users/'+this.state.u_id;
        fetch(apiUrl)
            .then((response) => (response.json()))
            .then((res) =>
            {
                if(res === null)
                {
                    this.setState({not: false })
                }
                else
                {
                    this.setState({data: res })
                }
            }).then(this.setState({loggedIn: true}))
            .then(localStorage.setItem("token","abcd"))
            .catch(err => console.log(err))

        console.log("in compnet mount")
        console.log(this.state.data)


    }

    onValueChange(e)
    {
        this.setState({
            [e.target.name]: e.target.type === 'text' ? parseInt(e.target.value) : e.target.value

        });
        console.log(e.target.value)
    }

    handleSubmit(e)
    {
        e.preventDefault();
        const walletName  = this.state.walletName;
        const amount = this.state.amount
        const value= {walletName,amount}
        console.log(JSON.stringify(value));


        const apiUrl = '/credit/'+this.state.u_id;
        const requestOptions = {
            method: 'POST',
            headers: { 'Accept':'application/json','Content-Type': 'application/json' },
            body: JSON.stringify(value)
        };

        if(this.state.walletName=== '')
        {
            NotificationManager.error('', 'No wallets exist');
        }
        else {
            fetch(apiUrl, requestOptions)
                .then(response => response.json)
                .then(data => console.log(data))
                .then(this.setState({amount: ''}))


            NotificationManager.success('', 'Amount Credited!', 5000, () => {
                this.componentDidMount();
            })
        }
        e.target.reset();


    }

    goBack(e)
    {
        this.props.history.push({
            pathname: '/home',
            data:[{ id:this.state.u_id , name :this.state.username }]// your data array of objects
        })

    }
    render() {

        console.log(this.state.loggedIn)
        if(this.state.loggedIn != true)
        {
          return <Redirect to='/'/>
        }

        if(this.state.home)
        {
            console.log(this.props.username , this.props.loggedIn  ,this.props.data)
            return <Home username={this.props.username} loggedIn={this.props.loggedIn} data={this.props.data} />
        }

        let i=0;

        const data=this.state.data;




        console.log(this.state.loggedIn)
        return (

            <div  className="page-holder bg-cover " style={{backgroundColor: '#c2eaba',
                backgroundImage: 'linear-gradient(319deg, #c2eaba 0%, #c5f4e0 37%, #efc2cf 100%)'}}>
                {console.log(data)}
                <NotificationContainer />
                <br/><br/><br/><br/>
                <div className="card box_shw2 border-0 px-3 rounded-2 mb-3 w_500 py-4 mx-auto mt-5" >

                    <form onSubmit={this.handleSubmit}>
                        <h3>Add Money</h3>
                        <hr/>
                        {this.state.not ?
                        <div className="form-group">


                                <b><label>Choose Wallet</label>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Balance&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Status</span></b>

                                <table width="500"  cellSpacing="30" >

                                    {data.map((d)=>{
                                    return(
                                    <div key={i++}>

                                        {(d.is_active) ?
                                        <tr>
                                            <td width="150">
                                                    <input
                                                    type="radio"
                                                    label= {d.id}
                                                    name="walletName"
                                                    required="required"
                                                    value={d.wallet_name}
                                                    onChange={this.onValueChange}/>
                                                    {d.wallet_name}
                                            </td>
                                            <td width="150">{d.wallet_balance}</td>
                                            <td width="150">Active</td>
                                        </tr>
                                        :
                                        <tr >
                                            <td style={{color:"gray"}} width="150">
                                                <input
                                                    type="radio"
                                                    label= {d.id}
                                                    name="walletName"
                                                    required="required"
                                                    disabled
                                                    value={d.wallet_name}
                                                    onChange={this.onValueChange}/>
                                                {d.wallet_name}
                                            </td>
                                            <td style={{color:"gray"}} width="150" >{d.wallet_balance}</td>
                                            <td style={{color:"gray"}} width="150"> Blocked</td>
                                        </tr>
                                        }




                                    </div>
                                    );
                                })}

                                </table>

                            <label>Amount</label>
                            <input type="text" pattern="[0-9]*" className="form-control" placeholder="Enter amount" required="required"  name="amount" value={this.state.amount} onChange={this.onValueChange} />

                            </div>
                                :
                                <p style={{color: "red"}}>No Wallets exist </p>}


                                <br/>
                        <button type="submit" className="btn btn-primary btn-block">Add Money</button>
                        <br/>
                    </form>
                        <p className=" text-right">
                            <Button onClick={this.goBack}>Go Back</Button>
                        </p>

                </div>
            </div>
        );
    }

}
export default Credit;