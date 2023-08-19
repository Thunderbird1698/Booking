import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../accountnav";
import PerksPage from "../perks";
import PhotosUploader from "../photosuploader";
import { useEffect, useState } from "react";
import axios from "axios";


export default function PlacesFormPage() {
    const{id} = useParams();
    const [title,setTitle] = useState("");
    const [address,setAddress] = useState("");
    const [addedphotos, setAddedPhotos] = useState([]);
    const [perks,setPerks] = useState([]);
    const [description,setDescription] = useState("");
    const [extraInfo,setExtraInfo] = useState("");
    const [checkIn,setCheckIn] = useState("");
    const [checkOut,setCheckout] = useState("");
    const [maxGuests,setMaxGuests] = useState(1);
    const [price,setPrice] = useState(100);
    const [redirect,setRedirect] = useState(false);

    useEffect(() =>{
        if (!id){
            return;
        }
        axios.get("/places/"+id).then(response =>{
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckout(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);

        });
    }, [id])

    function inputHeader(title){
        return(
            <h2 className="text-2xl mt-4">{title}</h2>
        )
    };

    function paraHeader(title){
        return(
            <p className="text-gray-500 text-sm">{title}</p>
        )
    };

    function bothHeader(header, description){
        return(
            <>
                {inputHeader(header)}
                {paraHeader(description)}
            </>
        )
    };

    async function saveplace(ev){
        ev.preventDefault();
        const placeData = {title, address, addedphotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests,price};

        if(id){
            await axios.put('/places', 
            {id, ...placeData
            });
            setRedirect(true);
        }
        else {
            await axios.post('/places', placeData);
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={'/account/places'} />
    }

    return (
        <>
            <div>
                <AccountNav />
                <form onSubmit={saveplace}>
                    {bothHeader("Title","Make it short and nice")}
                    <input type="text" placeholder="Title of place" value={title} onChange={ev => setTitle(ev.target.value)}></input>
                    {inputHeader("Address")}
                    <input type="text" placeholder="Address/Locaiton" value={address} onChange={ev => setAddress(ev.target.value)}></input>
                    {inputHeader("Photos")}
                    <PhotosUploader addedphotos={addedphotos} onChange={setAddedPhotos}/>
                    {inputHeader("Desceription")}
                    <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>
                    {bothHeader("Perks","Select all the checkboxes")}
                    <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        <PerksPage selected={perks} onChange={setPerks}/>
                    </div>
                    {bothHeader("Extra Information", "House rules")}
                    <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
                    {bothHeader("Check In & Out Time", "Add check in and out time")}
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                        <div>
                            <h3 className="mt-2 -mb-1">check In Time</h3>
                            <input type="text" placeholder="10:00" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">check Out Time</h3>
                            <input type="text" placeholder="22:00" value={checkOut} onChange={ev => setCheckout(ev.target.value)}/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Max Guests</h3>
                            <input type="number" placeholder="Maximum number od guest allowed" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)}/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Price per Night CAD $</h3>
                            <input type="number" placeholder="Enter price for per night" value={price} onChange={ev => setPrice(ev.target.value)}/>
                        </div>
                    </div>
                        <button className="primary my-4">Submit</button>
                </form>
            </div>
        </>
    )
}