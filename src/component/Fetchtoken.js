const Fetchtoken=(username, password)=>{
    const send={"username":{username}, "password":{password}};

    const api="http://localhost:5000/api/login";
    fetch(api,{
        method: 'POST',
        body:JSON.stringify(send),
        headers: new Headers({
            'Content-Type': 'application/json'
    })}).then(
        res=>res.json()
        ).catch(err => {
            err.toString();
    })
}

export default Fetchtoken;

