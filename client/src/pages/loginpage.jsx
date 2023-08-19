import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../usercontext";


export default function LoginPage() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function loginuser(ev){
        ev.preventDefault();
        try {
            const {data} = await axios.post("/login", {
                email,
                password,
            });
            setUser(data);
            alert("Login Successful");
            setRedirect(true);
        } catch (error) {
            alert("Login Failed");
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form action="" className="max-w-md mx-auto" onSubmit={loginuser}>
                    <input type="email"  placeholder="your email" value={email} onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" placeholder="Enter password" value={password} onChange={ev => setPassword(ev.target.value)}/>
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Dont have an account? 
                        <Link className="underline text-black" to={'/register'}>Register Now</Link>
                        </div>
                </form>
            </div>
        </div>
    );
}