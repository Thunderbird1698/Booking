import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./usercontext";

export default function BookingWidget({place}){
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [numberofGuest, setNumberofGuests] = useState(1);
    const [redirect,setRedirect] = useState("");
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user) {
            setName(user.name);
        }
    }, [user]);

    let numberofNights = 0;
    if( checkIn && checkOut){
        numberofNights = differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
    }

    async function bookthisplace(ev){
        ev.preventDefault();
       const response = await axios.post("/booking",{checkIn,checkOut,numberofGuest,name,email,mobile,
                        price:numberofNights * place.price, place:place._id });
       const bookingId = response.data._id;
       setRedirect("/account/bookings/"+bookingId);
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div className="mt-4 bg-white shadow p-4 rounded-2xl gap-2">
            <div className="text-2xl text-center">
                Price: {place.price} /per Night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-4 px-4">
                        <label>Check In:</label>
                        <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                    </div>
                    <div className="py-4 px-4 border-l">
                        <label>Check Out:</label>
                        <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
                    </div>
                </div>
                <div>
                    <div className="py-4 px-4 border-t">
                        <label>Number of Guests: </label>
                        <input type="number" value={numberofGuest} onChange={ev => setNumberofGuests(ev.target.value)}/>
                    </div>
                    {numberofNights > 0 && (
                        <div className="py-4 px-4 border-t">
                            <label>your Name: </label>
                            <input type="text" value={name} onChange={ev => setName(ev.target.value)}/>
                            <label>your Email: </label>
                            <input type="email" value={email} onChange={ev => setEmail(ev.target.value)}/>
                            <label>Phone Number: </label>
                            <input type="tel" value={mobile} onChange={ev => setMobile(ev.target.value)}/>
                        </div>
                    )}
                </div>
            </div>
            <button onClick={bookthisplace} className="primary mt-4">
                Book this Place: 
                {numberofNights > 0 && (
                    <span> ${numberofNights * place.price}</span>
                )}
            </button>
        </div>
    );
}