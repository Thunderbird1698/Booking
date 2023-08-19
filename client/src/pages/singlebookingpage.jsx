import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../addresslink";
import PlaceGallery from "../placegallery";
import BookingDates from "../bookingdates";

export default function SingleBookingPage(){
    const {id} = useParams();
    const [booking,setBooking] = useState(null);
    useEffect(() =>{
        if(id){
            axios.get("/bookings").then(response=>{
                const foundbooking = response.data.find(({_id}) => _id === id);
                if (foundbooking){
                    setBooking(foundbooking);
                }
            });
        }
    },[id]);

    if(!booking){
        return "";
    }

    return(
        <div>
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-4 mb-4 rounded-2xl">
                <h2 className="text-xl">Your Booking Information: </h2>
                <BookingDates booking={booking} />
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    );
}