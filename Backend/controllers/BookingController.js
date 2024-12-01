import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";
import User from "../models/User.js";

const addBooking = async (req, res) => {
    try {
        // Check if booking already exists with confirmed status
        const bookingExists = await Booking.findOne({
            userId: req.body.userId,
            flightId: req.body.flightId,
            status: "confirmed"
        });

        if (bookingExists) {
            return res.status(400).json({ message: "You already have a confirmed booking for this flight" });
        }

        // Get flight details
        const flight = await Flight.findById(req.body.flightId);
        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        // Check if enough seats are available
        if (flight.availableSeats < req.body.numberOfSeats) {
            return res.status(400).json({ message: "Not enough seats available" });
        }

        // Create new booking
        const newBooking = new Booking({
            userId: req.body.userId,
            flightId: req.body.flightId,
            flightInfo: {
                flightNumber: flight.flightNumber,
                airline: flight.airline,
                origin: flight.origin,
                destination: flight.destination,
                date: flight.date,
                time: flight.time
            },
            numberOfSeats: req.body.numberOfSeats,
            totalPrice: req.body.totalPrice,
        });

        // Save booking
        const savedBooking = await newBooking.save();

        // Update available seats
        flight.availableSeats -= req.body.numberOfSeats;
        await flight.save();

        res.status(201).json({
            message: "Booking created successfully",
            booking: savedBooking
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const bookings = async (req, res) => {
    try {
        const bookingsList = await Booking.find()

        if (!bookingsList || bookingsList.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }

        res.status(200).json(bookingsList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { status } = req.body;

        // Validate booking status
        if (!status || !['confirmed', 'pending', 'canceled'].includes(status)) {
            return res.status(400).json({ message: "Invalid booking status" });
        }

        // Find booking and update
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // If canceling a confirmed/pending booking, restore flight seats
        if (status === 'canceled' && booking.status !== 'canceled') {
            const flight = await Flight.findById(booking.flightId);
            if (flight) {
                flight.availableSeats += booking.numberOfSeats;
                await flight.save();
            }
        }

        // Update booking status
        booking.status = status;
        const updatedBooking = await booking.save();

        res.status(200).json({
            message: "Booking status updated successfully",
            booking: updatedBooking
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        if (!bookingId) {
            return res.status(400).json({ message: "Booking ID is required" });
        }

        // Find booking
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // If deleting a confirmed/pending booking, restore flight seats
        if (booking.status !== 'canceled') {
            const flight = await Flight.findById(booking.flightId);
            if (flight) {
                flight.availableSeats += booking.numberOfSeats;
                await flight.save();
            }
        }

        // Delete the booking
        await Booking.findByIdAndDelete(bookingId);

        res.status(200).json({
            message: "Booking deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const userBookings = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Find all bookings for the user
        const userBookings = await Booking.find({ userId })
            .populate('flightId')
            .sort({ createdAt: -1 }); // Sort by newest first

        // Transform the data to match the expected format
        const formattedBookings = userBookings.map(booking => ({
            _id: booking._id,
            userId: booking.userId,
            flightId: booking.flightId._id,
            numberOfSeats: booking.numberOfSeats,
            totalPrice: booking.totalPrice,
            status: booking.status,
            flightInfo: {
                airline: booking.flightId.airline,
                flightNumber: booking.flightId.flightNumber,
                origin: booking.flightId.origin,
                destination: booking.flightId.destination,
                date: booking.flightId.date,
                time: booking.flightId.time
            }
        }));

        res.status(200).json(formattedBookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export { addBooking, bookings, updateBooking, deleteBooking, userBookings }