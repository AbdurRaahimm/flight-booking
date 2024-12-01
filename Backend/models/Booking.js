import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user ID']
    },
    flightId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
        required: [true, 'Please provide a Flight ID']
    },
    flightInfo: {
        type: Object,
        required: true
    },
    numberOfSeats: {
        type: Number,
        required: [true, "Please provide Number of seats booked"],
    },
    totalPrice: {
        type: Number,
        required: [true, "Please provide Total price"],
    },
    status: {
        type: String,
        enum: ["confirmed", "pending", "canceled"],
        default: "pending"
    },
}, { timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;