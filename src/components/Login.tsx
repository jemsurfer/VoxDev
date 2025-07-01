import { useState, type FormEvent } from "react";
import { useCookies } from 'react-cookie'
import { useNavigate } from "react-router";
import supabase from "../lib/supabase";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [_, setCookie] = useCookies(['user'])
    const nav = useNavigate();

    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error){console.error(error); return}

        nav('/');
        //Set cookie to expire in a week
        setCookie('user', {email, password}, { path: '/', maxAge: 604800})
    }

    return (
        <>
            <form onSubmit={handleLogin}>
            <label>
                Email:
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <input type="submit" value="Submit" />
            </form>
            <a href="/signup">Sign up</a>
        </>
    )
}

export default Login