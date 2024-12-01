# Flights Collection
This collection stores information about available flights.
```json
{
  "_id": ObjectId,            // Unique identifier for the flight
  "flightNumber": String,     // Unique flight number
  "airline": String,          // Airline name
  "origin": String,           // Origin airport code (e.g., JFK)
  "destination": String,      // Destination airport code (e.g., LAX)
  "date": Date,               // Date of the flight
  "time": String,             // Time of departure
  "price": Number,            // Price per seat
  "availableSeats": Number,   // Total available seats
  "createdAt": Date,          // Timestamp for flight entry creation
  "updatedAt": Date           // Timestamp for flight entry update
}
```
# Bookings Collection
This collection stores information about flight bookings, referencing the Users and Flights collections.
```json
{
  "_id": ObjectId,            // Unique identifier for the booking
  "userId": ObjectId,         // Reference to the Users collection
  "flightId": ObjectId,       // Reference to the Flights collection
  "numberOfSeats": Number,    // Number of seats booked
  "totalPrice": Number,       // Total price (price per seat * number of seats)
  "status": {                 // Booking status
    "type": String,
    "enum": ["confirmed", "pending", "canceled"],
    "default": "pending"
  },
  "createdAt": Date,          // Timestamp for booking creation
  "updatedAt": Date           // Timestamp for booking update
}

```

# Relationships
Users ↔ Bookings: One-to-many relationship. Each user can have multiple bookings.
The userId field in Bookings references the _id field in Users.

Flights ↔ Bookings: One-to-many relationship. Each flight can have multiple bookings.
The flightId field in Bookings references the _id field in Flights.

# Example
## Flight
```json
{
  "_id": "64b7e1d2a7d1c9438c7e02f4",
  "flightNumber": "AA101",
  "airline": "American Airlines",
  "origin": "JFK",
  "destination": "LAX",
  "date": "2024-12-25",
  "time": "10:00 AM",
  "price": 350.00,
  "availableSeats": 150,
  "createdAt": "2024-11-28T12:00:00Z",
  "updatedAt": "2024-11-28T12:00:00Z"
}
````
## booking
```json
{
  "_id": "64b7e1d2a7d1c9438c7e02f5",
  "userId": "64b7e1d2a7d1c9438c7e02f3",
  "flightId": "64b7e1d2a7d1c9438c7e02f4",
  "numberOfSeats": 2,
  "totalPrice": 700.00,
  "status": "confirmed",
  "createdAt": "2024-11-28T12:05:00Z",
  "updatedAt": "2024-11-28T12:05:00Z"
}
```