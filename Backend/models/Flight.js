import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: [true, "Please provide a Flight Number"],
        unique: true
    },
    airline : {
        type: String,
        required: [true, "Please provide an Airline Name"],
    },
    origin: {
        type: String,
        required: [true, "Please provide your airport"],
    },
    destination: {
        type: String,
        required: [true, "Please provide a Destination airport"],
    },
    date: {
        type: Date,
        required: [true, "Please provide Date of the flight"],
    },
    time: {
        type: String,
        required: [true, "Please provide Time of departure"],
    },
    price: {
        type: Number,
        required: [true, "Please provide Price per seat"],
    },
    availableSeats: {
        type: Number,
        required: [true, "Please provide Total available seats"],
    },
}, {timestamps: true});

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;