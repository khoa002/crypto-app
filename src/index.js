const axios = require("axios");
const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const path = require("path");
const ipc = electron.ipcRenderer;
const notification = {
  title: "BTC Alert",
  body: "BTC just beat your target price!",
  icon: path.join(__dirname, "../assets/images/btc.png"),
};

let price = document.querySelector("h1");
let targetPriceVal;
let targetPrice = document.getElementById("targetPrice");

const notifyBtn = document.getElementById("notifyBtn");
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

      if (targetPrice.innerHTML != "" && targetPriceVal < res.data.BTC.USD) {
        const myNotification = new window.Notification(
          notification.title,
          notification
        );
      }

      myNotification.onclick = () => {
        console.log("clicked");
      };
    });
}
getBTC();
setInterval(getBTC, 30000);

ipc.on("targetPriceVal", function (event, arg) {
  targetPriceVal = Number(arg);
  targetPrice.innerHTML = "$" + targetPriceVal.toLocaleString("en");
});
