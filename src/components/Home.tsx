import '../styles/Home.css'

//Cheetah - realtime, less accurate
// import VoiceWidget from './VoiceWidgetCheetah'
//Leopard - post-recording, accurate
import VoiceWidget from './VoiceWidgetLeopard'

function Home() {
    return (
        <div className="home">
            <main>
                <VoiceWidget />
            </main>
            <aside className="sidebar border">
                <img src="/VoxDev.png" alt="VoxDev Logo"/>
            </aside>
        </div>
    )
}

export default Home