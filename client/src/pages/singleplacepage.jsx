import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../bookingwidget";
import PlaceGallery from "../placegallery";
import AddressLink from "../addresslink";

export default function SinglePlace(){
    const {id} = useParams();
    const [place,setPlace] = useState(null);

    useEffect(() =>{
        if(!id){
            return;
        }
        axios.get("/places/"+id).then(response => {
            setPlace(response.data);
        })

    }, [id]);

    if (!place) return;

    return(
        <div className="mt-4 bg-gray-200 -mx-8 px-8 py-8">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place} />
            <div className="mt8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    <b>Check-In: </b> {place.checkIn}<br />
                    <b>Check-Out: </b> {place.checkOut}<br />
                    <b>Max Guest </b> {place.maxGuests}
                </div>
                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>
            <div className="bg-white mt-4 -mx-8 px-8 py-8 rounded-2xl border-t">
                <div>
                    <h2 className="font-semibold text-2xl">Extra Info</h2>
                </div>
                <div className="mb-4 mt-1 text-md text-gray-800 leading-5">{place.extraInfo}</div>
            </div>
        </div>
    );
}