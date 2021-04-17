import React, { Component } from "react";
import {Form ,Modal ,Col ,Row ,Button} from 'react-bootstrap';


export default class Statement extends Component
{
    render() {
        return(

                <div className="page-holder bg-cover " style={{backgroundColor: '#c2eaba',
                    backgroundImage: 'linear-gradient(319deg, #c2eaba 0%, #c5f4e0 37%, #efc2cf 100%)'}}>
                    <br/><br/><br/>


                    <div className="card box_shw2 border-0 px-3 rounded-2 mb-3 w_500 py-4 mx-auto mt-5">
                        <header className="text-center">
                            <h3>Generate Statement</h3>
                        </header>
                        <br/>
                        <div className=" form-group">
                    <form >
                    <table width="500"  cellPadding="10"  >
                        <tr>

                            <td>

                                <label><b>Choose Wallet</b></label><br/>
                                <Form.Group id="formGridCheckbox">
                                    <Form.Check type="checkbox" label="Wallet 1" />
                                    <Form.Check type="checkbox" label="Wallet 2" />
                                    <Form.Check type="checkbox" label="Wallet 3" />
                                </Form.Group>

                            </td>



                            <td>
                                <label><b>Transaction Type</b></label><br/>
                                <Form.Group id="formGridCheckbox">
                                    <Form.Check type="checkbox" label="Credit" />
                                    <Form.Check type="checkbox" label="Debit" />
                                </Form.Group>
                            </td>
                        </tr>


                    </table>

                    <br/>
                    <button type="submit" className="btn btn-primary btn-block">Generate</button>
                    <br/>
                    <p className=" text-right">
                        <a href="/home">Go Back</a>
                    </p>
                </form>
                    </div>

                    </div>



                </div>
        )
    }


}