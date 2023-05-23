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
    "555181543213",
    "5511997431362",
    "551197431362",
    "555181543213"
  ].slice(currentIndex);

  for(let contact of contacts) {
    // var numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
    // let contact =  `551197395${numeroAleatorio}`;

    if(process.argv[2] == "649132e7-03dc-4c90-9747-a137225450a1") {
      contact = "5511973951769"
    }
    
    if (deviceStatus === false) {
      break;
    }

    let timeoutId = setTimeout(() => {
      isStarted = false;
      startAdvertising();
    }, 60000);

    currentIndex++;

    console.log(`Ligando para ${contact} - index ${currentIndex}`)
    await CallModel.startCall(contact, "https://company-rs.com/propaganda.wav")
      // 5195804269
      .then((response) => {
        console.log(`Ligaçao realizada para ${contact} - index: ${currentIndex} realizada`);
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