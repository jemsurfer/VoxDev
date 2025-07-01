import { useState, type FormEvent } from "react";
import supabase from "../lib/supabase";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [_, setCookie] = useCookies(['user']);
    const nav = useNavigate();

    async function handleSignup(event: FormEvent){
        event.preventDefault();

        const {error} = await supabase.auth.signUp({
            email,
            password
        });

        if (error){console.error(error); return}

        nav('/');
        //Set cookie to expire in a week
        setCookie('user',{email,password}, {path: '/', maxAge: 604800})
    }

    return (
        <>
            <form onSubmit={handleSignup}>
            <label>
                Email:
                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </label>
            <br />
            <input type="submit" value="Submit" />
            </form>
            <a href="/login">Log in</a>
        </>
    )
}

export default Signup