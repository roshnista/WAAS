import React,{Component} from "react";
import {Button, Form} from "react-bootstrap";
import Home from "./home";
import {NotificationContainer, NotificationManager} from "react-notifications";
var st,stt;

class Status extends Component
{
        constructor(props)
        {
            super(props);

            this.state=
                {
                u_id:this.props.location.id,
                username:this.props.location.name,
                loggedIn:this.props.location.loggedIn,
                data:this.props.location.data,
                walletName:'',
                home:false,
                blockedUsers:[],
                checkCount: 0,
                checkboxValid:false,
                not:true
                }

                this.onValueChange = this.onValueChange.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
                this.goBack=this.goBack.bind(this);
        }

    componentDidMount()
    {
        console.log(this.state.u_id)
        const username = this.state.username
        const value = {username}
        console.log('Current State is: ' + JSON.stringify(value));

        const apiUrl = 'http://localhost:8080/users/'+this.state.u_id;
        console.log(apiUrl)
        fetch(apiUrl)
            .then((response) => (response.json()))
            .then((res) =>
            {
                if(res === null)
                {
                    this.setState({not:false })
                }
                else
                {
                    this.setState({data: res })
                    this.state.data.map(d => {

                        if (d.is_active === 0)
                        {
                            this.setState({blockedUsers:this.state.blockedUsers.concat(d.wallet_name) , checkCount:this.state.checkCount + 1 })
                        }
                    })
                }
            })
            .catch(err => console.log(err))

        console.log(this.state.blockedUsers)
        console.log("in compnet mount")
        console.log(this.state.data)


    }

    onValueChange(event) {
        var joined, l, i

        let a = this.state.blockedUsers;
        if (event.target.checked) {
            l = a.push(event.target.value)
            console.log(a)
        } else {
            if (a.includes(event.target.value)) {
                i = a.indexOf(event.target.value)
                a.splice(i, 1)
                console.log(a)
            }
        }

        this.setState({blockedUsers:a})

    }



        handleSubmit(event)
        {
            event.preventDefault()
            stt=this.state.blockedUsers

                var final = {blockNames: (stt)}
                console.log(JSON.stringify(final))
                console.log(this.state.u_id)

                const apiUrl = '/block/'+this.state.u_id;
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Accept':'application/json','Content-Type': 'application/json' },
                    body: JSON.stringify(final)
                };

                fetch(apiUrl,requestOptions)
                    .then(res => res.json) // or res.json()
                    .then(res => console.log(res))
                    .catch(err=>console.log(err))

                NotificationManager.success('', 'Selected wallets Blocked / Unblocked !' )



        }

        goBack(e)
        {
            this.props.history.push({
                pathname: '/home',
                data:[{ id:this.state.u_id , name :this.state.username }]// your data array of objects
            })
        }

    render()
        {

        const data=this.state.data;
        let i=0;

        if(this.state.home)
        {
            console.log(this.props.username , this.props.loggedIn  ,this.props.data)
            return <Home username={this.props.username} loggedIn={this.props.loggedIn} data={this.props.data} />
        }

        return(

            <div className="page-holder bg-cover " style={{backgroundColor: '#c2eaba',
                backgroundImage: 'linear-gradient(319deg, #c2eaba 0%, #c5f4e0 37%, #efc2cf 100%)'}}>
                <div className="justify-content-center">
                <NotificationContainer />
                </div>
<br/><br/><br/><br/>
                <br/><br/>
                    <div className="card box_shw2 border-0 px-3 rounded-2 mb-3 w_500 py-4 mx-auto mt-5">

                    <form onSubmit={this.handleSubmit}>

                        <h3>Choose Wallet to Block</h3>
                        <br/>
                        {this.state.not ?
                        <div className="form-group">
                            <b><label> Wallets</label>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Balance</span></b>
                            <table width="500"  cellSpacing="30" >

                            <Form.Group id="formGridCheckbox">
                            {data.map((d)=> {
                                return (
                                    <div key={i++}>
                                        {(d.is_active)
                                            ?
                                            <tr>
                                                <td width="150">
                                                    <Form.Check type="checkbox" label={d.wallet_name} key={i++}
                                                                value={d.wallet_name}
                                                                onClick={this.onValueChange}/>
                                                </td>
                                                <td width="150">{d.wallet_balance}</td>
                                            </tr>

                                            :

                                            <tr>
                                                <td width="150">
                                                    <Form.Check type="checkbox" defaultChecked label={d.wallet_name} key={i++}
                                                                value={d.wallet_name}
                                                                onClick={this.onValueChange}/>
                                                </td>
                                                <td width="150">{d.wallet_balance}</td>
                                            </tr>
                                        }
                                    </div>
                            )})
                            }
                            </Form.Group>
                            </table>


                        </div>
                            :<p style={{color: "red"}}>No user exists </p>}

                        <br/>
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        <br/>
                    </form>

                        <p className=" text-right">
                            <Button onClick={this.goBack}>Go Back</Button>
                        </p>
                    </div>

            </div>
        )
    }
}

export default Status;
