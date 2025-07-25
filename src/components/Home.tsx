import { useEffect, useState } from 'react';
import useEsbuild from '@/lib/esbuild';
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

    const {
        addFile,
        createBundle,
        // deleteFile,
        // editFileContent,
        // editFileName,
        files,
        output,
        // rawImports,
        // resetVFS,
        versionGeneratorRef,
        versionRef,
    } = useEsbuild(null);

    //Re-bundle every time the filesystem changes
    useEffect(() => {
        const vfs = files.filesById;

        const timeout = setTimeout(() => {
            if (typeof versionRef.current !== "number") {
                return;
            }
            versionRef.current = versionGeneratorRef.current.next().value;
            createBundle(vfs, versionRef.current);
        }, 300);

        return () => clearTimeout(timeout);
    }, [files.filesById]);

    async function handleSubmit() {
        const result = await getComponentList(transcript);
        if (typeof result === "string") {
            setMessage(result);
        } 
        else { 
            const components = await createComponents(result);
            for (const component of components) {
                console.log(component.content)
                addFile(component);
            }
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
