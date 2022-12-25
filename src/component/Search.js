import React, {useState, useEffect, useRef} from 'react';
import '../bootstrap-5.2.1/dist/css/bootstrap.min.css';
import '../jquery.js';
import '../bootstrap-5.2.1/dist/js/bootstrap.min.js';

function Search(props){
    const [data,setData]=useState([{}]);
    const [readystate,setReadystate]=useState("");
    const mounted=useRef();
    const [check,setCheck]=useState();
    const [value,setValue]=useState();
    let cnt=useRef();

    useEffect(()=>{
        if(!mounted.current){ //componentDidMount
            setReadystate("unready");
            mounted.current=true;
            cnt.current=0;
            setValue("search");
          }
        else( //componentDidUpdate
            setTimeout(()=>{
            fetch("http://localhost:5000/members").then(
                res=>res.json()
            ).then(
                data=>{   
                    setData(data);
                    setReadystate("ready");
                    setCheck("ready");
                    console.log(data);
                }
            ).catch(err => {
                console.log(err);
                cnt.current++;
                setCheck("unready"+cnt.current);
                console.log(check);
            })},1000)
        )
    },[readystate,check])

    
    //async useEffect function
    /**useEffect(()=>{
        const fetchData = async () => {
            const data = await fetch('/members');  
            const json = await data.json();
            setData(json);secondary
            setReadystate("ready");
        }
        fetchData().catch(console.error);}
        ,[readystate,data])**/

    return (
        <>        
            <div className="container-fluid  justify-content-center align-items-center d-flex">
                <div className="alert alert-secondary">
                    {value}
                </div>
            </div>

            <div className="container-fluid  justify-content-center align-items-center d-flex">
                <div className="row alert alert-warning justify-content-center p-1 m-1 ">
                    {(readystate==="unready")?(
                        <p className=" p-1 m-1 ">Loding{cnt.current}......</p>
                    ):(
                    data.members?.map((member,i)=>(
                        <a className="col col-3 btn btn-primary d-block m-3 " key={i}
                        href="https://www.youtube.com/watch?v=13Dv9zvH4ko">{member}</a>
                    ))
                    )}
                </div>
            </div>
        </>
    )   
}

export default Search;

/**{(typeof data.members==="undefined")?(
    <p className="bg-success">Loding......</p>
):(
data.members.map((member,i)=>(
    <a className="col col-3 btn btn-primary d-block m-3 " key={i}
    href="https://www.youtube.com/watch?v=13Dv9zvH4ko">{member}</a>
))
)}**/

