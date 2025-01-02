const express = require('express');
const router = express.Router();
const { getAvailableTables, createBooking, getAllBookings, deleteBooking } = require('../controllers/bookingController');

router.get('/availability', getAvailableTables);

router.post('/', createBooking);

router.get('/', getAllBookings);

router.delete('/:bookingId', deleteBooking);

module.exports = router;
