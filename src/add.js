const closeBtn = document.getElementById("closeBtn");
const electron = require("electron");
const path = require("path");
const remote = electron.remote;

closeBtn.addEventListener("click", function (event) {
  var window = remote.getCurrentWindow();
  window.close();
});
