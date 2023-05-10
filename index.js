const socket = require("./services/rsvoip");

const CallModel = require("./modules/call/call.models");
console.log("🔵 Conectando ao device via webscoket");

socket.on("connect", () => {
  console.log("🟢 Device connected");

  CallModel.startCall("5511973951769")
    .then((response) => {
      console.log("ligação iniciada");
    })
    .catch((error) => {
      console.error("Erro ao realizar ligação");
    })
});