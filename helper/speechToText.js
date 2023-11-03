const axios = require("axios")
const fs = require("fs")
const openAI = require("openai");
const openai = new openAI({
  apiKey: process.env.openAiApiKey,
});
var transcribe = false;

const speechToText = async (userFilePath, saved) => {
  if (saved === "1") {
    console.log(`saved ${saved} transcribe ${transcribe}`)
    transcribe = false;
    return {}
  }
  else {
    try {
      console.log(userFilePath)
      const file = fs.createReadStream(userFilePath)
      console.log(file)
      const transcript = await openai.audio.transcriptions.create({
        file: file,
        model: "whisper-1",
        // language: "hindi"
      }
      );
      if (!transcript) {
        return "no data somw error"
      }
      else {
        transcribe = true;
        return {
          transcript,
          transcribe
        }
      }
    } catch (error) {
      return error.message;
    }

  }
};


module.exports = { speechToText };