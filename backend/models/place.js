const mongoose = require("mongoose");

const placeschema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title:String,
    address:String,
    photos:[String],
    description:String,
    perks:[String],
    extraInfo:String,
    checkIn:Number,
    checkOut:Number,
    maxGuests:Number,
    price:Number
});

const placeModel = mongoose.model('Place', placeschema);

module.exports = placeModel;