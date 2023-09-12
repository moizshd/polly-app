import React, { useState } from "react";
import { SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { pollyClient } from "./utils/pollyClient";

function App() {
  const [audioSrc, setAudioSrc] = useState("");

  const synthesizeVoice = async () => {
    const params = {
      OutputFormat: "mp3",
      Text: "Hello Bawa G, Asalamu alaikummm? Moiz Has integrated AWS Polly in React App. So Now Wahaj can listen to this message. This is My Friend Team and letgs see how my friend team do this project",
      TextType: "text",
      VoiceId: "Ivy",
      SampleRate: "22050",
    };

    try {
      const result = await pollyClient.send(new SynthesizeSpeechCommand(params));
      if (audioSrc) {
        URL.revokeObjectURL(audioSrc);
      }
      console.log(result)
      // Convert the ReadableStream to an array of bytes
      const reader = result.AudioStream.getReader();
      const chunks = [];
      let data = await reader.read();
      while (!data.done) {
        chunks.push(data.value);
        data = await reader.read();
      }

      const audioArray = new Uint8Array(chunks.reduce((acc, val) => acc.concat(Array.from(val)), []));

      const audioBlob = new Blob([audioArray], { type: "audio/mp3" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioSrc(audioUrl);
    } catch (err) {
      console.error("Error synthesizing voice", err);
    }
  };

  return (
    <div className="App">
      <button onClick={synthesizeVoice}>Synthesize Voice</button>
      {audioSrc && (
        <div>
          <audio controls src={audioSrc} key={audioSrc}>
            Your browser does not support the audio element.
          </audio>
          <button onClick={() => document.querySelector("audio").play()}>Play</button>
        </div>
      )}    </div>
  );
}

export default App;
