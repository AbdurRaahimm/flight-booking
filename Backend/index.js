import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js'
import flightRoutes from './routes/flight.js'
import bookingRoutes from './routes/booking.js'
const port = 8080



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/',  (req, res) => {
    res.json({
        message: `API running...`,
    });
});


// routes
app.use('/api', authRoutes)
app.use('/api', flightRoutes)
app.use('/api', bookingRoutes)

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
    await connectDB();
});
