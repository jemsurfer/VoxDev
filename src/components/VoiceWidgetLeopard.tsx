import { useEffect } from "react";
import { useLeopard } from "@picovoice/leopard-react";

interface Props {
  transcript: string,
  setTranscript: React.Dispatch<React.SetStateAction<string>>
}

export default function VoiceWidget(props: Props) {
  const {
    result,
    isLoaded,
    error,
    init,
    startRecording,
    stopRecording,
    isRecording,
  } = useLeopard();

  const pv_key = import.meta.env.VITE_PV_TOKEN;

  useEffect(() => {
    async function initEngine() {
      await init(
        pv_key,
        { publicPath: "./leopard_params.pv" },
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
      props.setTranscript(result.transcript)
    }
  }, [result])

  return (
    <div>
      {error && <p className="error-message">{error.toString()}</p>}
      {!isLoaded ? <p>Loading speech to text, please wait..</p> :
        <button id="audio-record" onClick={toggleRecord} disabled={!isLoaded}>
          {isRecording ? <img src="/VoxDev-clear.png" alt="VoxDev logo clear" /> :
            <img src="/VoxDev.png" alt="VoxDev logo" />}
        </button>
      }
      <p>{props.transcript}</p>
    </div>
  );
}
