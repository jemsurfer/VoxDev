import { useEffect } from "react";
import { useCheetah } from "@picovoice/cheetah-react";

interface Props {
  transcript: string,
  setTranscript: React.Dispatch<React.SetStateAction<string>>
}

export default function VoiceWidget(props: Props) {
  const {
    result,
    isLoaded,
    isListening,
    error,
    init,
    start,
    stop,
  } = useCheetah();

  const pv_key = import.meta.env.VITE_PV_TOKEN;

  async function initEngine() {
    await init(
      pv_key,
      { publicPath: "./cheetah_params.pv" },
      { enableAutomaticPunctuation: true }
    );
  };

  async function toggleRecord() {
    if (isListening) {
      await stop();
    } else {
      await start();
    }
  };

  useEffect(() => {
    if (result !== null) {
      props.setTranscript(prev => {
        let newTranscript = prev + result.transcript
        if (result.isComplete) {
          newTranscript += " "
        }
        return newTranscript
      })
    }
  }, [result])

  return (
    <div>
      {error && <p className="error-message">{error.toString()}</p>}
      <br />
      <button onClick={initEngine} disabled={isLoaded}>Initialize Cheetah</button>
      <br />
      <br />
      <label htmlFor="audio-record">Record audio to transcribe:</label>
      <button id="audio-record" onClick={toggleRecord} disabled={!isLoaded}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <h3>Transcript:</h3>
      <p>{props.transcript}</p>
    </div>
  );
}
