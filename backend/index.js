const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/user");
const Place = require("./models/place");
const Booking = require("./models/booking");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const imagedownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
require('dotenv').config();

//user for Encrypting password
const encryptSalt = bcrypt.genSaltSync(10);
//JWT secret key
const jwtsecret = "asdasdqeqd234asda";

app.use(express.json());
app.use(cookieparser());
app.use('/uploads', express.static(__dirname +'/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

mongoose.connect(process.env.Mongo_DB)


const port = 5000;

app.get('/test',async (req,res) =>{
    console.log("called");
    res.status(200).json({Success: true, Message:"Tested OK"});
});

app.post('/register', async (req,res)=>{
    const {name, email, password} = req.body;
    const data = {
        "name": name,
        "email": email,
        "password": password
    };
    try {
        const newuser = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, encryptSalt),
        });
    
        res.status(200).json({Success: true, Message: newuser});   
    } catch (error) {
        res.status(422).json({Success: false, Message: error}); 
    }
});

app.post('/login', async (req,res)=>{
    const {email,password} = req.body;

    try {
        const userdata = await User.findOne({email});
        if (userdata){
           const verifypassword = bcrypt.compareSync(password,userdata.password);
           if(verifypassword){
            jwt.sign({email:userdata.email, id:userdata._id}, jwtsecret, {}, (err,token) => {
                if(err) throw err;
                res.status(200).cookie('token', token).json(userdata);
            });
            //console.log(userdata);
           }else{
            console.log("not ok paass");
           }
        }
        else{
            console.log("not found");
        }
    } catch (error) {
        res.status(422).json({Success: false, Message: error}); 
    }
});

app.get('/profile', async (req, res) => {
    const {token} = req.cookies;
    if (token){
        jwt,jwt.verify(token, jwtsecret, {}, async (err,userData) => {
            if(err) throw err;
            const {name,email,_id} = await User.findById(userData.id);
            res.json({name,email,_id});
        })
    }
    else{
        res.json(null);
    }
});

app.post('/logout', async (req,res) =>{
    res.cookie('token', "").json(true);
});

app.post("/upload-by-link", async (req,res) =>{
    const {link} = req.body;
    const newName = Date.now() + ".jpg";

    await imagedownloader.image({
        url:link,
        dest: __dirname + "/uploads/" + newName,
    });
    res.json(newName)
});

const photoMiddleware = multer({dest:'uploads/'});
app.post("/upload", photoMiddleware.array('photos', 10), async (req,res) => {
    const uploadedfiles = [];
    for (let i=0; i < req.files.length; i++){
        const {path,originalname} = req.files[i];
        const parts = originalname.split(".");
        const ext = parts[parts.length -1];
        const newpath = path + '.' + ext;
        fs.renameSync(path,newpath);
        uploadedfiles.push(newpath.replace("uploads\\",""));
    }
    res.json(uploadedfiles);
});

app.post("/places", async (req,res) =>{

    const {token} = req.cookies;
    const {title,address,addedphotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price} = req.body;
    jwt.verify(token, jwtsecret, {}, async (err,userData) => {
        if(err) throw err;
        const PlaceDoc = await Place.create({
            owner: userData.id,
            title,address,photos:addedphotos,
            description,perks,extraInfo,
            checkIn,checkOut,maxGuests,price,
        });
        res.json(PlaceDoc);
    })
});

//user-places
app.get("/places", async (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtsecret, {}, async (err,userData) => {
        const {id} = userData;
        res.json( await Place.find({owner:id}));
    });
});

app.get("/places/:id", async (req,res) =>{
    const{id} = req.params;
    res.json(await Place.findById(id));
});

app.put("/places", async (req,res) =>{
    const {token} = req.cookies;
    const {id,title,address,addedphotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price} = req.body;
    jwt.verify(token, jwtsecret, {}, async (err,userData) => {
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title,address,photos:addedphotos,
                description,perks,extraInfo,
                checkIn,checkOut,maxGuests,price,
            });
            await placeDoc.save();
            res.json("ok")
        }
    })
});

app.get("/getAllPlaces", async (req,res) => {
   res.json( await Place.find());
});

app.post("/booking", async (req,res) =>{
    const {token} = req.cookies;
    const {place,checkIn,checkOut,numberofGuest,name,email,mobile,price} = req.body;
    jwt.verify(token, jwtsecret, {}, async (err,userData) => {
        Booking.create({
            place,checkIn,checkOut,numberofGuest,name,email,mobile,price,user:userData.id
        }).then((doc) =>{
            res.json(doc);
        }).catch((err) =>{
            throw err;
        })
    })
    
});

/*function getuserdatafromToken(token){
    return new Promise((resolve,reject) ={
        jwt.verify(token, jwtsecret, {}, async (err,userData) => {
            if(err)
        })
    })
}*/

app.get("/bookings", async (req,res) =>{
    const {token} = req.cookies;
    jwt.verify(token, jwtsecret, {}, async (err,userData) => {
        res.json(await Booking.find({user:userData.id}).populate('place'));
    })
});

app.listen(port,()=> console.log(`server running on port: ${port}`));