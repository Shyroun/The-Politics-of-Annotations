const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
console.log("boom1")

app.post("http://localhost:8080/api/v1/auth/login", async (request, response) => {
    //console.log(request);
    const api_url = "http://localhost:8080/api/v1/auth/login";
    const fetch_response = await fetch(api_url, {

    });
    const json = await fetch_response.json();
    response.json(json);
    console.log(json)
});
/*
 app.post("/myAPI", async (request, response) => {
    console.log("boom2")
    

    
    response.json(json);
    console.log(json)
    console.log(request);
}); */
/*
app.post("/api", (request,response) => {
    console.log(request);

});*/

// "key": "387f97608a6d057a0046d0be21eaa17272fca823"