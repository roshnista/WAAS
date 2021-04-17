import React, {Component} from "react";
import {Col, Form, Row} from "react-bootstrap";

class Default extends Component{
    render() {
        return(
            <div className="bg-cover page-holder bg-transparent" style={{backgroundColor: '#c2eaba',
                backgroundImage: 'linear-gradient(319deg, #c2eaba 0%, #c5f4e0 37%, #efc2cf 100%)'}}>
                <br/><br/><br/><br/><br/>
                <div className="card box_shw2 border-0 px-3 rounded-2 mb-3 w_500 py-4 mx-auto mt-5" >
                    <form >
                        <h3>Change Default Wallet</h3>
                        <hr/>
                        <div className="form-group">

                            <label>Choose Wallet</label>

                            <fieldset >
                                <Form.Group as={Row}>
                                    <Col sm={10}>
                                        <Form.Check
                                            type="radio"
                                            label="Wallet 1"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios1"
                                            required
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Wallet 2"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios2"
                                            required
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Wallet 3"
                                            name="formHorizontalRadios"
                                            id="formHorizontalRadios3"
                                            disabled
                                        />
                                    </Col>
                                </Form.Group>
                            </fieldset>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        <br/>
                        <p className=" text-right">
                            <a href="/home">Go Back</a>
                        </p>
                    </form>
                </div>


            </div>
        )
    }
}

export default Default;