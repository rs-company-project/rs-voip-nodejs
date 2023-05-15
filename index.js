const socket = require("./services/rsvoip");

const CallModel = require("./modules/call/call.models");
console.log("🔵 Conectando ao device via webscoket");

let isStarted = false;
let deviceStatus = false;
let currentIndex = 0;

console.log(process.argv, "args")
const startAdvertising = async () => {
  if (isStarted) {
    return;
  }

  isStarted = true;

  let contacts = [
    "5511973951769",
    "5511973951769",
    "5511973951769",
    "5511973951769",
    "5511973951769",
    "5511973951769",
    "5511973951769",
    "5511973951769"
  ].slice(currentIndex);

  for (let contact of contacts) {
    if (deviceStatus === false) {
      break;
    }

    let timeoutId = setTimeout(() => {
      isStarted = false;
      startAdvertising();
    }, 60000);

    currentIndex++;
    await CallModel.startCall(contact, "https://company-rs.com/propaganda.wav")
      // 5195804269
      .then((response) => {
        console.log(`Ligação para ${contact} -  index: ${currentIndex} realizada`);
      })
      .catch((error) => {
        console.error(`Erro ao realizar ligação para ${contact} - index: ${currentIndex}`, error);
      })
      .finally(() => {
        clearInterval(timeoutId);
      })
  }
}

socket.on("connect", () => {
  console.log("🟢 Device connected");
  deviceStatus = true;

  setTimeout(() => {
    startAdvertising();
  }, 5000)
});

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
  deviceStatus = false;
});