getData();

async function getData() {
    const api_url = "http://localhost:8080/api/swagger/?format=openapi";
    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);
}






/**
request.open('GET', 'http://localhost:8080/api/v1/jobs/2', true);

request.onload = function() {
    var data = JSON.parse(this.response)
    console.log(data);
}

function authentification() {

    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:8080/api/v1/auth/login");

}

request.send();
 */
