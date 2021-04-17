import React from 'react';
import './navi.css';
function Footer(props) {
    return(
    <div >

       <footer className="mainfooter fixed-bottom" role="contentinfo">
        <div className="footer-middle pt-1">
        <div className="container">
        <div className="row">
        <div className="col-md-3 col-sm-6">
        <div className="footer-pad">
            <br/>
        <h4>GRAB-WAAS</h4>
        <ul className="list-unstyled">
        <li><a href="#"></a></li>
        {/*<li><a href="/home">Home</a></li>*/}
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
        </ul>
        </div>
        </div>
        <div className="col-md-3 col-sm-6">
        <div className="footer-pad">

        </div>
        </div>
        <div className="col-md-3 col-sm-6">
        <div className="footer-pad">

        </div>
        </div>
        <div className="col-md-3">
            <br/>
        <h4>Follow Us</h4>
        <ul className="social-network social-circle">
        <li><a href="#" className="icoFacebook" title="Facebook"><i className="fa fa-mail-reply"></i></a></li>
        <li><a href="#" className="icoLinkedin" title="Linkedin"><i className="fa fa-linkedin"></i></a></li>
        </ul>
        </div>
        </div>
        <div className="row">
        <div className="col-md-12 copy">
        <p className="text-center">&copy; Copyright 2020 - WAAS.  All rights reserved.</p>
        </div>
        </div>


        </div>
        </div>
        </footer>

    </div>
    )
}

export default Footer;
