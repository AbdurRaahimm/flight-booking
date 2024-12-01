import express from 'express'
import { flight, flights, searchFlights, updateFlight, deleteFlight, addFlight } from '../controllers/FlightController.js';
import { adminVerify } from '../middleware/adminVerify.js'

const router = express.Router();

router.get("/flights", flights);
router.get("/flights/search", searchFlights);
router.get("/flights/:id", flight);
router.post("/flight", adminVerify, addFlight);
router.put("/flight/:id", adminVerify, updateFlight);
router.delete("/flight/:id", adminVerify, deleteFlight);

export default router