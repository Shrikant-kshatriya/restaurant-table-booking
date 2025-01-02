require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db.js');
const tableRoutes = require('./routes/tableRoutes.js');
const bookingRoutes = require('./routes/bookingRouter.js');

const app = express();

// connect to database
db();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/tables', tableRoutes);
app.use('/bookings', bookingRoutes);

app.listen(4000, () => {
    console.log('listening on ', 4000);
})