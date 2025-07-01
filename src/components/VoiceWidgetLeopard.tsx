import { useEffect, useState } from "react";
import { useLeopard } from "@picovoice/leopard-react";

export default function VoiceWidget() {
  const [transcript, setTranscript] = useState("");

  const {
    result,
    isLoaded,
    error,
    init,
    startRecording,
    stopRecording,
    isRecording,
  } = useLeopard();



  useEffect(() => {
    async function initEngine() {
      await init(
        "kVoTtq6oFTKhz5DlIWZ54hZ/UxqYC+hWId3eA6XN5XVFSFXF65Sl1w==",
        { publicPath: "./public/leopard_params.pv" },
        { enableAutomaticPunctuation: true }
      );
    };

    initEngine();
  })

  async function toggleRecord() {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };
  
  useEffect(() => {
    if (result !== null) {
      setTranscript(result.transcript)
    }
  }, [result])
  
  return (
    <div>
      {error && <p className="error-message">{error.toString()}</p>}
      {!isLoaded ? <p>Loading speech to text, please wait..</p> :      
        <button id="audio-record" onClick={toggleRecord} disabled={!isLoaded}>
          {isRecording ? <img src="/public/VoxDev-clear.png" alt="VoxDev logo clear" /> : 
          <img src="/public/VoxDev.png" alt="VoxDev logo" /> }
        </button> 
      }
      <h3>Transcript:</h3>
      <p>{transcript}</p>
    </div>
  );
}