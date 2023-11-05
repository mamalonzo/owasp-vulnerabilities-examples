// Written by Marc Malonzo
// This file contains the frontend code for the SSRF example

const fetchBitcoin = document.getElementById('fetch-bitcoin');
const fetchedData = document.getElementById('fetched-data');
const apiLink = 'https://api.coindesk.com/v1/bpi/currentprice.json'
const BACKEND_PORT = 3000;

fetchBitcoin.addEventListener('click', () => {
  fetch('http://localhost:' + BACKEND_PORT + '/getBitcoinPrice?url=' + apiLink).then(response => response.json()).then(data => {
    document.getElementById("time").innerText = "Last Updated: " + data.time.updated;
    document.getElementById("disclaimer").innerText = data.disclaimer;
    document.getElementById("usd-rate").innerText = data.bpi.USD.rate;
    document.getElementById("gbp-rate").innerText = data.bpi.GBP.rate;
    document.getElementById("eur-rate").innerText = data.bpi.EUR.rate; 
    fetchedData.style.display = "block";
  }).catch(error => {
    console.error(error);
    fetchedData.innerHTML = "Error: " + error.message;
  });
});