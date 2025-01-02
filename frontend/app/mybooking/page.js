"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`
      );
      const updatedBookings = bookings.filter((booking) => booking._id !== id);
      setBookings(updatedBookings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`
        );
        setBookings(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookings();
  });

  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          No bookings available.
        </p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <div
              key={booking._id}
              className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all"
            >
              <div className="text-lg font-bold text-blue-600 mr-4">
                {index + 1}.
              </div>

              <div className="flex-1">
                <p className="font-semibold text-lg">{booking.customer.name}</p>
                <p className="text-gray-600">Date: {booking.date}</p>
                <p className="text-gray-600">Time: {booking.time}</p>
                <p className="text-gray-600">Table: {booking.table}</p>
                <p className="text-gray-600">No. of Guests: {booking.customer.guests}</p>
                <p className="text-gray-600">
                  Contact: {booking.customer.contact}
                </p>
              </div>

              <button
                onClick={() => handleDelete(booking._id)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <FiTrash2 size={24} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
