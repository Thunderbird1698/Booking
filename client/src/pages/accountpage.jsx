import { useContext, useState } from "react"
import { UserContext } from "../usercontext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./palcespage";
import AccountNav from "../accountnav";

export default function AccountPage() {
    const {ready,user,setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    let {subpage} = useParams();
    if(subpage === undefined){
        subpage = 'profile';
    }

    async function logout(){
        await axios.post('/logout');
        setRedirect(true);
        setUser(null);
    }

    if (!ready){
        return "Loading...";
    }

    if(ready &&!user && !redirect){
        return <Navigate to={"/login"} />
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className="primary max-2-md mt-2">Logout</button>
                </div>
            )}

            {subpage === 'places' && (
                <div>
                    <PlacesPage />
                </div>
            )}
        </div>
    )
}
