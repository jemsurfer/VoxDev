import { useState } from 'react';
import '@/styles/Home.css'
import Iframe from './Iframe';
import Switch from "react-switch";

//Cheetah - realtime, less accurate
// import VoiceWidget from './VoiceWidgetCheetah'

//Leopard - post-recording, accurate
import VoiceWidget from './VoiceWidgetLeopard'
import { createComponents, getComponentList } from '@/lib/inference';

export default function Home() {
    const [transcript, setTranscript] = useState("");
    const [message, setMessage] = useState("");
    const [voiceToggle, setVoiceToggle] = useState(true);

    async function handleSubmit() {
        const result = await getComponentList(transcript);
        if (typeof result === "string") {
            setMessage(result);
        } 
        else { 
            
        }
    }

    return (
        <div className="home">
            <main>
                {voiceToggle ? <VoiceWidget transcript={transcript} setTranscript={setTranscript} /> 
                    : <input value={transcript} onChange={e=>setTranscript(e.target.value)} />}
                <br />
                <Switch onChange={ (s)=>{setVoiceToggle(s);setTranscript("")} } checked={voiceToggle}/>
                <br />
                <button onClick={handleSubmit}>Submit</button>
                {message ? <p>{message}</p> : <br />}
                <Iframe
                    onLoad={() => { }}
                    onPageRefresh={() => { }}
                    output={output}
                    shouldRefresh={false}
                />
            </main>
            <aside className="sidebar border">
                <img src="/VoxDev.png" alt="VoxDev Logo" />
            </aside>
        </div>
    )
}
