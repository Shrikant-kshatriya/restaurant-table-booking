const Booking = require('../models/Booking');
const Table = require('../models/Table'); 

const getAvailableTables = async (req, res) => {
    const { date, time } = req.query; 
  
    try {

      const selectedDate = new Date(date);

      const bookedTables = await Booking.find({ 
        date: selectedDate, 
        time: time 
      }).select('table'); 
  
      // Fetch all tables (ground and first floor)
      const groundFloorTables = await Table.find({ floor: 'ground' });
      const firstFloorTables = await Table.find({ floor: 'first' });

      const groundTables = groundFloorTables.map((table) => {
        const isBooked = bookedTables.some(booking => booking.table === table.id);
        return {
          id: table.id,
          seats: table.seats,
          booked: isBooked,
        };
      });
  
      const firstFloorTablesMapped = firstFloorTables.map((table) => {
        const isBooked = bookedTables.some(booking => booking.table === table.id);
        return {
          id: table.id,
          seats: table.seats,
          booked: isBooked,
        };
      });

      const tablesByFloor = {
        Ground: groundTables,
        First: firstFloorTablesMapped,
      };

      res.json(tablesByFloor);
    } catch (error) {
      console.error('Error fetching available tables:', error);
      res.status(500).json({ message: 'Error fetching available tables', error });
    }
  };

// Create a new booking
const createBooking = async (req, res) => {
    const { date, time, table, customer } = req.body; 
  
    try {
      const existingBooking = await Booking.findOne({
        date: new Date(date),
        time: time,
        table: table,
      });
  
      if (existingBooking) {
        return res.status(400).json({ message: 'Table is already booked for the selected time.' });
      }

      const newBooking = new Booking({
        date: new Date(date),
        time: time,
        table: table,
        customer: customer,
      });

      await newBooking.save();
      res.status(201).json({ message: 'Booking successfully created!', booking: newBooking });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ message: 'Error creating booking', error });
    }
  };
  
  
  // Delete a booking
  const deleteBooking = async (req, res) => {
    const { bookingId } = req.params; 
  
    try {
      const deletedBooking = await Booking.findByIdAndDelete(bookingId);
  
      if (!deletedBooking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.json({ message: 'Booking successfully deleted', booking: deletedBooking });
    } catch (error) {
      console.error('Error deleting booking:', error);
      res.status(500).json({ message: 'Error deleting booking', error });
    }
  };

//   get all booking
  const getAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.find();
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ message: 'Error fetching bookings', error });
    }
  };

module.exports = { getAvailableTables, createBooking, deleteBooking, getAllBookings };
