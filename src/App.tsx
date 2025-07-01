import { Routes, Route} from "react-router";
import { useCookies } from "react-cookie";
import Login from './components/Login'
import Landing from './components/Landing'
import Signup from './components/Signup';
import Home from "./components/Home";

function App() {
  const [cookies, _] = useCookies(['user'])

  return (
    <Routes>
      <Route path="/" element={cookies.user ? <Home/> : <Landing/>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
    </Routes>
  )
}

export default App