var request = new XMLHttpRequest();

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