const express = require("express");
const app = express();
const fetch = require("node-fetch");

var loginData;
var dataReceived = false;
var keyToken;

//1. START MY APP
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));


//2. LISTEN TO CLIENT TO GET LOGIN DATA
app.post("/myAPI", (request, response) => {
    console.log("I got a request!");
    loginData = request.body;
    console.log(loginData);
    dataReceived = true;
    response.json({
        status: "success",
        received: request.body
    })
    loginToAPI();
});


//3. SEND TO CVAT THE LOGIN DATA AND RECEIVE KEY
async function loginToAPI() {
    const data = {
        "username": loginData.username,
        "email": loginData.email,
        "password": loginData.password
    }
    const options = {
        method: "POST",
        headers: {
            //'Authorization': 'Token 97ea4b91c5c93d6e7ba72857ef5b70ff30831a30',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    const api_url = "http://localhost:8080/api/v1/auth/login";
    const response = await fetch(api_url, options);
    const json = await response.json();
    dataReceived = false;
    keyToken = json;
    console.log("key received")
    console.log(keyToken.key);
    createNewUser();
}


//4. GET JOB INFORMATION (TEST)
async function createNewUser() {
    const options = {
        method: "GET",
        headers: {
            'Authorization': "token " + keyToken.key,
            "Content-Type": "application/json"
        },
        //body: JSON.stringify(data)
    };
    //fUWjX4blhjhsA2G72A9RVyu6e1sbPxxOjhJQVvXOt1VdkyprydzyF2wwkwx1QW1e
    //bygoXYGi2BlXe0oHsjqJKwy9ztB6i2oPfV3VVpsLejZIYw71YWQqu0AzFYGWjrSf

    const api_url = "http://localhost:8080/api/v1/jobs/5";
    const response = await fetch(api_url, options);
    const json = await response.json();
    console.log("received job information");
    console.log(json);
}


/**
app.post("http://localhost:8080/api/v1/auth/login", async (request, response) => {
    console.log("boom1")
    //console.log(request);
    const api_url = "http://localhost:8080/api/v1/auth/login";
    const fetch_response = await fetch(api_url, {

    });
    const json = await fetch_response.json();
    response.json(json);
    console.log(json)
});  */


/*
app.post("/api", (request,response) => {
    console.log(request);

});*/

// "key": "387f97608a6d057a0046d0be21eaa17272fca823"