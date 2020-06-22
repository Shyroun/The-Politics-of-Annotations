getData();

async function getData() {
    const api_url = "http://localhost:3000/myAPI";
    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);
}


//1b814f00b1d0e2a137d59ee4bb214e3efcd47212
//1b814f00b1d0e2a137d59ee4bb214e3efcd47212