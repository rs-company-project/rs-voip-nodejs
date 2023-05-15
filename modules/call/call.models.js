const RSSocket = require("../../services/rsvoip");

class Call {
  startCall(whatsapp_id, audio_url) {
    return new Promise((resolve, reject) => {
      try {
        RSSocket.emit("calls:robotic-start", { whatsapp_id: whatsapp_id, audio_url: audio_url }, (response) => {
          resolve(response);
        });
      } catch (error) {
        console.log("error", error, "error");
        reject(error);
      }
    })
  }
}

module.exports = new Call;