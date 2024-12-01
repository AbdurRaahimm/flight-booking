import Flight from "../models/Flight.js";

const addFlight = async (req, res) => {
    try {
        // Check if all required fields are provided
        if (!req.body) {
            return res.status(400).json({ message: "All flight details are required" });
        }

        // Check if flight number already exists
        const flightExist = await Flight.findOne({ flightNumber: req.body.flightNumber });
        if (flightExist) {
            return res.status(400).json({ message: "Flight with this number already exists" });
        }

        // Create a new flight
        const newFlight = new Flight(req.body);

        // Save the flight to the database
        const savedFlight = await newFlight.save();
        res.status(201).json({
            message: "Flight added successfully",
            flight: savedFlight
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const flights = async (req, res) => {
    try {
        const flightsList = await Flight.find();

        if (!flightsList || flightsList.length === 0) {
            return res.status(404).json({ message: "No flights found" });
        }

        res.status(200).json(flightsList);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching flights", error: error.message });
    }
};

const flight = async (req, res) => {
    try {
        const flightId = req.params.id;
        if (!flightId) {
            return res.status(400).json({ message: "Flight ID is required" });
        }
        const foundFlight = await Flight.findById(flightId);

        if (!foundFlight) {
            return res.status(404).json({ message: "Flight not found" });
        }
        res.status(200).json(foundFlight);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching flights", error: error.message });
    }
};

const searchFlights = async (req, res) => {
    try {
        const { origin, destination, date } = req.query;

        // Build the query object
        const query = {};
        if (origin) query.origin = origin;
        if (destination) query.destination = destination;

        // Handle date query
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1); // Add one day to cover the full day
            query.date = { $gte: startDate, $lt: endDate };
        }

        // Search for flights
        const flights = await Flight.find(query);

        if (!flights || flights.length === 0) {
            return res.status(404).json({ message: "No flights found for the given criteria" });
        }

        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while searching for flights", error: error.message });
    }
};

const updateFlight = async (req, res) => {
    try {
        const flightId = req.params.id; 
        const updateData = req.body; 
        // Validate flight ID
        if (!flightId) {
            return res.status(400).json({ message: "Flight ID is required" });
        }

        // Find the flight and update details
        const updatedFlight = await Flight.findByIdAndUpdate(
            flightId,
            updateData,
            { new: true, runValidators: true }
        );

        // Check if flight exists
        if (!updatedFlight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        
        res.status(200).json({
            message: "Flight updated successfully",
            flight: updatedFlight
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while updating the flight",
            error: error.message
        });
    }
};

const deleteFlight = async (req, res) => {
    try {
        const flightId = req.params.id; 

        // Validate flight ID
        if (!flightId) {
            return res.status(400).json({ message: "Flight ID is required" });
        }

        const deletedFlight = await Flight.findByIdAndDelete(flightId);

        // Check if flight exists
        if (!deletedFlight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        res.status(200).json({
            message: "Flight deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while deleting the flight",
            error: error.message
        });
    }
};
export { addFlight, flights, flight, searchFlights, updateFlight, deleteFlight };
