const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    table: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/i.test(value);
        },
        message: (props) => `${props.value} is not a valid time format!`,
      },
    },
    customer: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      guests:{
        type: Number,
        required: true,
        min: 1,
      },
      contact: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            return /^\d{10}$/.test(value);
          },
          message: (props) => `${props.value} is not a valid contact number!`,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
