getData();

async function getData() {
    const api_url = "http://localhost:3000/myAPI";
    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);
}
