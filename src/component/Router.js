import React, {useState} from 'react';
import {/*HashRouter, */BrowserRouter, Route, Routes /*Link*/} from "react-router-dom";
import App from "./App";
import Search from './Search';
import Login from './Login';
import Layout from './Layout';
import Createboard from './Createboard';
import Boardlist from './Boardlist';
import Register from './Register'

const Router=(props)=>{
    const [islogin ,setLogin]=useState(false);
    const setlogin=(e)=>{
        setLogin(e);
    }
    return( 
        <BrowserRouter>
            <Layout islogin={islogin}>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/createboard" element={<Createboard/>}/>
                    <Route path="/boardlist" element={<Boardlist/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route exact path="/" element={<App setlogin={setlogin}/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default Router;

