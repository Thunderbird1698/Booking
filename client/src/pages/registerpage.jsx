import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    async function registeruser(ev){
        ev.preventDefault();
        try {
            await axios.post("/register", {
                name,
                email,
                password,
            });
            alert("Registration Completed, now login.");   
        } catch (error) {
            alert("Registration Failed");
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form action="" className="max-w-md mx-auto" onSubmit={registeruser}>
                    <input type="text"  placeholder="Hansil Yogi" value={name} onChange={ev => setName(ev.target.value)}/>
                    <input type="email"  placeholder="your email" value={email} onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" placeholder="Enter password" value={password} onChange={ev => setPassword(ev.target.value)}/>
                    <button className="primary">Sign up</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a Menber? 
                        <Link className="underline text-black" to={'/login'}>Login</Link>
                        </div>
                </form>
            </div>
        </div>
    );
}