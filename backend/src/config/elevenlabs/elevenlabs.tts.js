import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
import { Readable } from 'stream';
import { ELEVENLABS_API_KEY } from "../env.js";

const elevenlabs = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

const generateSpeechFromText = async (text) => {
// audio will be a ReadableStream object
  const audio = await elevenlabs.textToSpeech.convert("ISCzWD5dlKGqdgkYePJf", {
    text,
    modelId: "eleven_flash_v2_5",
    outputFormat: "mp3_44100_128",
    enable_logging: false,
  });

  console.log("elevenlabs response ", audio);

// Can't read data from ReadableStream directly. Have to grab the reader object from it and lock the stream
  const reader = audio.getReader();


  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) {
        this.push(null);
      } else {
        // this.push() is built in function of Readable class. Pushes the chunk downstream to consumer (= stream.pipe(res) in controller)
        this.push(value);
      }
    },
  });
};

export default generateSpeechFromText;
