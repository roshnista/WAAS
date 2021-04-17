import React, { Component } from "react";

import {Button,Form ,Col ,Row} from 'react-bootstrap';
import Home from "./home";
import {NotificationContainer, NotificationManager} from "react-notifications";

class Debit extends Component
{
    constructor(props) {
        super(props);

        this.state={
            u_id:this.props.location.id,
            username:this.props.location.name,
            loggedIn:this.props.location.loggedIn,
            data:this.props.location.data,
            walletName:'',
            bal:'',
            amount:'',
            home:false,
            x:"",
            errorMessage:'',
            not:true
        }

        this.onValueChange = this.onValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack=this.goBack.bind(this);
    }

    componentDidMount()
    {
        const username = this.state.username
        const value = {username}
        console.log('Current State is: ' + JSON.stringify(value));

        // const api = '/login';
        // const request = {
        //     method: 'POST',
        //     headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        //     body: JSON.stringify(value)
        // };

        const apiUrl = 'http://localhost:8080/users/'+this.state.u_id;
        console.log(apiUrl)
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
            })
            .then((data) => console.log('logged in'))
            .then(this.setState({loggedIn: true}))
            .then(localStorage.setItem("token","abcd"))
            .catch(err => console.log(err))



    }

    onValueChange(e)
    {
        this.setState({
            [e.target.name]: e.target.type === 'text' ? parseInt(e.target.value) : e.target.value,

        });
    }

    handleSubmit(e) {
        e.preventDefault();


            const {walletName, amount} = this.state;
            const value = {walletName, amount}
            console.log(JSON.stringify(value));


            const apiUrl = '/debit/' + this.state.u_id;
            const requestOptions = {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify(value)
            };


        if(this.state.walletName=== '')
        {
            NotificationManager.error('', 'No wallet Exists');
        }
        else {
            fetch(apiUrl, requestOptions)
                .then(res => {
                    if (res.ok) {
                        this.setState({errorMessage: '',amount:''})
                        NotificationManager.success('', 'Amount Debited!', 5000, () => {
                            this.componentDidMount();
                        })

                    } else {
                        this.setState({amount: ''})
                        res.json().then(body => {
                            NotificationManager.error('', body);
                        })
                    }
                })
        }
            // fetch(apiUrl, requestOptions)
            //     .then(response=> response.json)
            //     .then(data=>console.log(data))
            //     .then(alert("money debited"))
            //     .then(this.setState({amount:''}))
            //     .catch(err=>console.log(err))

                // .then(response => response.text())
                // .then(data => {this.setState({x:data}) })
                // .then(alert("debited"))
                // .then(this.setState({
                //     walletName: '',
                //     amount: ''
                // }))
                // .catch(err => console.log(err))


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
            console.log(this.props.username , this.props.loggedIn  ,this.props.data)
            return <Home username={this.props.username} loggedIn={this.props.loggedIn} data={this.props.data} />
        }


        const data=this.state.data;
        let i=0
        console.log(data)
        return (
            <div  className="page-holder bg-cover" style={{backgroundColor: '#c2eaba',
                backgroundImage: 'linear-gradient(319deg, #c2eaba 0%, #c5f4e0 37%, #efc2cf 100%)'}}>
                {console.log(data)}
                <NotificationContainer />
                <br/><br/><br/><br/>
                <div className="card box_shw2 border-0 px-3 rounded-2 mb-3 w_500 py-4 mx-auto mt-5" >
                    <form onSubmit={this.handleSubmit} >
                        <h3>Send Money</h3>
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
                        <button type="submit" className="btn btn-primary btn-block">Debit Money</button><br/>
                    </form>
                        <p className=" text-right">
                            <Button className="btn-primary" onClick={this.goBack}>Go Back</Button>
                        </p>

                </div>
            </div>
        );
    }

}
export default Debit;