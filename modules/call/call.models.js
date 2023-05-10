const RSSocket = require("../../services/rsvoip");

const fs = require('fs');
const pcm = require('pcm');
const wav = require('wav');

class Call {
  constructor() {

  }

  startCall(whatsappid) {
    return new Promise((resolve, reject) => {
      try {
        RSSocket.emit("calls:start", whatsappid, (response) => {
          this.readAudio();
          resolve(response);
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  readAudio() {
    return new Promise((resolve, reject) => {
      try {
        const inputFile = './test.wav';

        // Crie um leitor de arquivos .wav
        const file = fs.createReadStream(inputFile);
        const reader = new wav.Reader();

        // Assim que o leitor de wav estiver pronto, nós podemos ler os dados PCM
        reader.on('format', (format) => {
          // Vamos dividir os dados de áudio em pedaços de 1 segundo
          const bytesPerSample = format.bitDepth / 8;
          const samplesPerSecond = format.sampleRate;
          const chunkSize = bytesPerSample * samplesPerSecond * format.channels;

          let chunk = Buffer.alloc(0);

          // A cada pedaço de dados, adicione ao chunk até atingir 1 segundo de áudio
          reader.on('data', (data) => {
            chunk = Buffer.concat([chunk, data]);

            while (chunk.length >= chunkSize) {
              // Corte o primeiro segundo de áudio
              const oneSecond = chunk.slice(0, chunkSize);
              chunk = chunk.slice(chunkSize);

              // Aqui você tem um segundo de áudio em PCM
              console.log(oneSecond);
              RSSocket.emit("microphone_buffer", oneSecond);
            }
          });

          reader.on('end', () => {
            // Quando terminar de ler o arquivo, lide com qualquer áudio restante
            if (chunk.length > 0) {
              console.log(chunk, "chunk");
            }
          });
        });

        // Inicie a leitura do arquivo
        file.pipe(reader);

      } catch (error) {
        reject(error);
      }
    })
  }
}

module.exports = new Call;