const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));

/* app.get("/myAPI", async (request, response) => {
    const api_url = "http://localhost:8080/api/swagger/?format=openapi";
    const fetch_response = await fetch(api_url, {
        headers: {
            'Authorization': 'Basic ' + new Buffer('julia-alfeo:Q5zgxpGq').toString('base64'), 
        }
    });
    console.log(fetch_response)
    const json = await response.json();
    response.json(json);
}); */

app.get("/myAPI", async (request, response) => {
    const api_url = "http://localhost:8080/api/v1/jobs/5";
    const fetch_response = await fetch(api_url, {
        headers: {
            'Authorization': 'Token 387f97608a6d057a0046d0be21eaa17272fca823',
          }
    });
    console.log(fetch_response)
    const json = await fetch_response.json();
    response.json(json);
    console.log(json)
});

app.post("/api", (request,response) => {
    console.log(request);

});

// "key": "387f97608a6d057a0046d0be21eaa17272fca823"