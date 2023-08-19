import { useEffect, useState } from "react";
import AccountNav from "../accountnav";
import axios from 'axios';
import PlaceImg from "../palceimg";
import { Link } from "react-router-dom";
import BookingDates from "../bookingdates";


export default function BookingPage(){
    const [bookings,setBookings] =useState([]);

    useEffect(() =>{
        axios.get('/bookings').then(response =>{
            setBookings(response.data);
        })
    },[]);

    return(
        <div>
           <AccountNav />
           <div>
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                        <div className="w-60">
                            <PlaceImg place={booking.place} />
                        </div>
                        <div className="py-3 pr-3 grow">
                            <h2 className="text-xl">{booking.place.title}</h2>
                            <BookingDates booking={booking} />
                        </div>
                    </Link>
                ))}       
           </div>
        </div>
    );
}