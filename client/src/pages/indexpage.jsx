import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Indexpage() {
    const [places,setPlaces] = useState([]);
    useEffect(() =>{
        axios.get("/getAllPlaces").then(response => {
            setPlaces(response.data);
        })
    }, []);
    return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.length > 0 && places.map(place => (
            <Link to={'/place/'+place._id}>
                <div className="bg-gray-500 mb-4 rounded-2xl flex">
                    {place.photos?.[0] && (
                        <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:5000/uploads/'+place.photos?.[0]} alt="" />  
                    )}
                </div>
                <h3 className="font-bold">{place.address}</h3>
                <h2 className="text-sm truncate text-blue-900">{place.title}</h2>
                <div className="mt-1">
                    <span className="font-bold">${place.price} per Night (CAD)</span>
                </div>
            </Link>
        ))}
    </div>
    );
}