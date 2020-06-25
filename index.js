const express = require("express");
const app = express();
const fetch = require("node-fetch");
const annotation_url = "http://localhost:8080"

var loginData;
var dataReceived = false;
var keyToken;
var lastUserID

var autoUsername;
var pw;

//1. START MY APP
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));


//2. LISTEN TO CLIENT TO GET LOGIN DATA
app.get("/myAPI", (request, response) => {
    loginToAPI();
    const data = {
        username: autoUsername,
        password: pw
    }

    response.json({
        body: JSON.stringify(data)
    })
    //response.send("myAPI");
    
});

//3. SEND TO CVAT THE LOGIN DATA AND RECEIVE KEY
async function loginToAPI() {
    const data = {
        "username": "julia-alfeo",
        "email": "jalfeo94@live.de",
        "password": "Q5zgxpGq"
    }
    const options = {
        method: "POST",
        headers: {
            //'Authorization': 'Token 97ea4b91c5c93d6e7ba72857ef5b70ff30831a30',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    const api_url = annotation_url + "/api/v1/auth/login";
    const response = await fetch(api_url, options);
    const json = await response.json();
    dataReceived = false;
    keyToken = json;
    console.log("key received")
    console.log(keyToken.key);
    getLastUserID();
}


//4. GET THE ID OF LAST USER
async function getLastUserID() {

    const options = {
        method: "GET",
        headers: {
            'Authorization': "token " + keyToken.key,
            "Content-Type": "application/json"
        },
    };
    const api_url = annotation_url + "/api/v1/users?page_size=100";
    const response = await fetch(api_url, options);
    const json = await response.json();
    const userCount = json.count; //amount of existing users
    console.log("length of array with user");
    console.log(json.results[userCount-1]);
    lastUserID = json.results[userCount-1].id;
    console.log("received last user ID : " + lastUserID);
    createNewUser();
}

//5. CREATE NEW USER AND PASS IT TO CLIENT API FUNCTION
async function createNewUser() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    lastUserID += 1;
    autoUsername = "autoUser-" + lastUserID;
    pw = randomstring;
    //console.log("random password: " + pw);

    const data = {
        "username": autoUsername,
        "password1": pw,
        "password2": pw,
        "confirmations": [
            {
                "name": "autoName" + lastUserID + 1
            }
        ]
    }
    const options = {
        method: "POST",
        headers: {
            'Authorization': "token " + keyToken.key,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    const api_url = annotation_url + "/api/v1/auth/register";
    const response = await fetch(api_url, options);
    const json = await response.json();
    //console.log("new user created");
    //console.log("username: " + autoUsername);
    //console.log("password: " + pw);
}