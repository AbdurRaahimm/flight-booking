import express from 'express'
import { authVerify } from '../middleware/authVerify.js'
import { adminVerify } from '../middleware/adminVerify.js'
import { addBooking, bookings, deleteBooking, updateBooking, userBookings } from '../controllers/BookingController.js';
const router = express.Router();


router.post("/booking", authVerify, addBooking);
router.get("/bookings", adminVerify, bookings);
router.get("/bookings/user/:id", authVerify, userBookings);
router.put("/booking/:id", adminVerify, updateBooking);
router.delete("/booking/:id", adminVerify, deleteBooking);


export default router