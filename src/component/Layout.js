import React from 'react';
import '../scss/all.css';
import '../jquery.js';
import '../bootstrap-5.2.1/dist/js/bootstrap.min.js';
import {Link} from "react-router-dom";

const Layout=(props)=>{

    return(
        <div className="container-fiuld">
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">美食論壇</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li>
                    <Link className="nav-link me-3" to="/search">Search</Link>
                </li>
                
                <li>
                    <Link className="nav-link me-3" to="/Login">Login</Link>
                </li>

                <li>
                    <Link className="nav-link me-3" to="/createboard">Createboard</Link>
                </li>

                <li>
                    <Link className="nav-link me-3" to="/boardlist">Board</Link>
                </li>

                <li>
                    <Link className="nav-link me-3" to="/register">Register</Link>
                </li>
            </ul>
            <form className="d-flex" role="search" action="http://localhost:5000/result" 
                    method="post">
                <input className="form-control me-2" type="search" name="request" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
        </nav>
        {props.children}
    </div>
    )
}
export default Layout;

