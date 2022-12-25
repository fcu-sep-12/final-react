import React, {useState, useEffect, useRef} from 'react'
import {Link} from "react-router-dom";
//this is customize bootstrap
import '../scss/all.css';
import '../jquery.js';
import '../bootstrap-5.2.1/dist/js/bootstrap.min.js';
import '../bootstrap-5.2.1/dist/css/bootstrap.min.css';
import App from './App';


const Login=(props)=>{
    const [token, setToken]=useState(null);
    const [check, setCheck] = useState();
    const [isLogin, setLogin]=useState(false);
    const [errorMessage, setErrormessage]=useState();
    const [username ,setUsername]=useState("");
    const [password, setPassword]=useState("");

    const handleLogin=(e)=>{
        setLogin(true);
        setErrormessage(null);

        const send={"username":{username}, "password":{password}};

        const api="http://localhost:5000/api/login";
        fetch(api,{
            method: 'POST',
            body:JSON.stringify(send),
            headers: new Headers({
                'Content-Type': 'application/json'
        })}).then(
                res=>res.json()
            ).then(
                data=>{
                    if (data.token===null){
                        console.log(data);
                    }else{
                        setToken(data.token);
                        setCheck(data.success);
                        console.log(data);
                    }
                    setLogin(false);
                }
            ).catch(
                (err)=>{setErrormessage(err)}
            );
    };

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }; 
    
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    return(
        <>
            {(check)?(<App islogin={check}></App>):
            (<div className="d-flex justify-content-center">
                <div className="d-flex mt-3">
                    <div  className="alert alert-warning shadow-lg" style={{height:'400px', width:'400px'}}
                    >
                        <div className="input-group mb-3 mb-5">
                            <span className="input-group-text bg-meteor shadow-sm">username</span>
                            <input type="text" value={username} onChange={handleUsername} className="form-control" name="username" placeholder="Username"/>
                        </div>
                        <div className="input-group mb-3 shadow-sm mb-5">
                            <span className="input-group-text bg-meteor">password</span>
                            <input type="password" value={password} onChange={handlePassword} className="form-control" name="password" placeholder="passworld"/>
                        </div>
                        <div className="d-flex justify-content-center ">
                            <input className="d-flex btn btn-outline-primary 
                            justify-content-center shadow-sm align-items-center" style={{height:'50px', width:'200px'}} 
                            type="submit" onClick={handleLogin} value={isLogin ? '登入中...' : '登入'}/>
                        </div>
                        <div>{(check) ?(<div className="mt-5 d-flex justify-content-center">login false</div>):(<div></div>)}</div>
                    </div>
                </div>
            </div>)
            }
        </>
    )
}

export default Login;