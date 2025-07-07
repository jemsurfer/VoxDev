import { useEffect } from 'react';
import useEsbuild from '../lib/esbuild';
import '../styles/Home.css'
import './MiniBrowser'

//Cheetah - realtime, less accurate
// import VoiceWidget from './VoiceWidgetCheetah'

//Leopard - post-recording, accurate
import VoiceWidget from './VoiceWidgetLeopard'
import MiniBrowser from './MiniBrowser';

function Home() {

    const {
        addFile,
        createBundle,
        deleteFile,
        editFileContent,
        editFileName,
        files,
        output,
        rawImports,
        resetVFS,
        versionGeneratorRef,
        versionRef,
    } = useEsbuild(null);

    useEffect(()=>{
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

    return (
        <div className="home">
            <main>
                <VoiceWidget />
                <MiniBrowser />
            </main>
            <aside className="sidebar border">
                <img src="/VoxDev.png" alt="VoxDev Logo"/>
            </aside>
        </div>
    )
}

export default Home