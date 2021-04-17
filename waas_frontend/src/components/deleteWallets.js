import React, {Component} from "react";
import {Form ,Modal ,Col ,Row ,Button} from 'react-bootstrap';
import Home from "./home";
import {NotificationContainer, NotificationManager} from "react-notifications";
var st ;
class DelModal extends Component{
    constructor(props) {
        super(props)
        this.state={
            walletname:'',
            u_id:this.props.location.id,
            username:this.props.location.name,
            loggedin:this.props.location.loggedIn,
            data:this.props.location.data,
            delete_wallets:[],
            checkCount: 0,
            checkboxValid:false,
            home:false,
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
                    this.setState({not:false })
                }
                else
                {
                    this.setState({data: res })
                }
            })
            .catch(err => console.log(err))

        console.log("in compnet mount")
        console.log(this.state.data)

        // fetch(api, request)
        //     .then((response) => (response.json()))
        //     .then(res => this.setState({data: res}))
        //     .then((data) => console.log('logged in'))
        //     .then(this.setState({loggedIn: true}))
        //     .then(localStorage.setItem("token","abcd"))
        //     .catch(err => console.log(err))


    }

    onValueChange(event)
    {
        var joined
        if(event.target.checked)
        {
            this.setState((prevState) => ({checkCount: prevState.checkCount + 1}))
            joined = this.state.delete_wallets.concat(event.target.value);
            this.setState({delete_wallets: joined})
            console.log(this.state.delete_wallets)
            // this.setState((prevState) => ({checkCount: prevState.checkCount + 1}))
            // //joined = this.state.delete_wallets.concat(event.target.value);
            // this.setState({delete_wallets:[...this.state.delete_wallets,event.target.value]})
            // console.log(this.state.delete_wallets, "in checked")
            //  st = this.state.delete_wallets
        }
        else
        {
            this.setState((prevState) => ({checkCount: prevState.checkCount - 1}))
            var index = this.state.delete_wallets.indexOf(event.target.value)
            joined = this.state.delete_wallets.splice(index,1);
            this.setState({delete_wallets: joined})
            console.log(this.state.delete_wallets)
            st = this.state.delete_wallets
        }
        console.log(st)
    }



    handleSubmit(event)
    {
        event.preventDefault()

        var stt=this.state.delete_wallets
        console.log(stt,st)


        if (this.state.checkCount === 0) {
            // this.setState({checkboxValid: true})
            NotificationManager.error('', 'Nothing is Selected')
        }
        else {
            var final = {DeleteNames: (stt)}
            console.log(JSON.stringify(final))
        console.log(this.state.u_id)

            const apiUrl = '/wallet/'+this.state.u_id;
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Accept':'application/json','Content-Type': 'application/json' },
                body: JSON.stringify(final)
            };

            fetch(apiUrl,requestOptions)
                .then(res => res.json)
                .then(data => console.log(data))
                .then(this.setState({delete_wallets:[]}))
                .catch(err=>console.log(err))

            NotificationManager.success('', 'Selected wallets deleted', 5000, () => {
                this.componentDidMount(); })


        }

        event.target.reset();
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
        console.log(data)
        let i=0;
        return (
            <div  className="page-holder bg-cover" style={{backgroundColor: '#c2eaba',
            backgroundImage: 'linear-gradient(319deg, #c2eaba 0%, #c5f4e0 37%, #efc2cf 100%)'}}>
                <NotificationContainer />
            <br/><br/><br/><br/>
                <div className="card box_shw2 border-0 px-3 rounded-2 mb-3 w_500 py-4 mx-auto mt-5" >

                    <h2>Delete Wallets</h2>
                    <br/>
            <form onSubmit={this.handleSubmit}>

                {this.state.not ?
                        <div className="form-group">

                            <b><label>Choose Wallet</label>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Balance&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Status</span></b>
                            <table width="500"  cellSpacing="30" >

                            <Form.Group id="formGridCheckbox">
                                {this.state.data.map((d)=> {
                                    return(
                                        <div key={i++}>

                                    {(d.is_active && d.wallet_balance == 0) ?
                                        <tr>
                                            <td width="150"><Form.Check type="checkbox" label={d.wallet_name} key={i++}
                                                                        value={d.wallet_name}
                                                                        onClick={this.onValueChange}/></td>
                                            <td width="150">{d.wallet_balance}</td>
                                            <td width="150">{d.is_active? "Active" : "Blocked" }</td>
                                        </tr>
                                        :
                                        <tr>
                                            <td style={{color:"gray"}} width="150"><Form.Check type="checkbox" disabled label={d.wallet_name} key={i++}
                                                                        value={d.wallet_name}
                                                                        onClick={this.onValueChange}/></td>
                                            <td style={{color:"gray"}} width="150">{d.wallet_balance}</td>
                                            <td width="150">{d.is_active? "Active" : "Blocked" }</td>
                                        </tr>
                                }
                                        </div>


                                    )})}
                            </Form.Group>
                            </table>





                        </div>
                    :<p style={{color: "red"}}>No Wallets exist </p>}

                        <button type="submit" className="btn btn-primary btn-block">Delete Wallet</button>
                    </form>
                    <br/><br/>
                    <p className=" text-right">
                        <Button className="btn-primary" onClick={this.goBack}>Go Back</Button>
                    </p>
                </div>
            </div>


        );
    }
}


export default DelModal;