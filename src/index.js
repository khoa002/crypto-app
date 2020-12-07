const axios = require("axios");
const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const path = require("path");

const notifyBtn = document.getElementById("notifyBtn");

var price = document.querySelector("h1");
var targetPrice = document.getElementById("targetPrice");

notifyBtn.addEventListener("click", function (event) {
  const modalPath = path.join("file://", __dirname, "add.html");
  let win = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });
  win.on("close", function () {
    win = null;
  });
  win.loadURL(modalPath);
  win.show();
});

function getBTC() {
  axios
    .get(
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD"
    )
    .then((res) => {
      const cryptos = res.data.BTC.USD;
      price.innerHTML = "$" + cryptos.toLocaleString("en");
    });
}
getBTC();
setInterval(getBTC, 30000);
