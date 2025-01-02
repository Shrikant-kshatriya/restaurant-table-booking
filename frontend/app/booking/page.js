"use client";

import { useState } from "react";
import CalendarPicker from "@/components/CalendarPicker";
import TableGrid from "@/components/TableGrid";
import TimeSlotPicker from "@/components/TimeSlotPicker";
import BookingForm from "@/components/BookingForm";
import axios from "axios";

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [tablesByFloor, setTablesByFloor] = useState({});
  const [showForm, setShowForm] = useState(false);

  const slots = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"];



  const fetchTableAvailability = async (date, time) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/availability`, {
        params: { date, time }
      });
      const { Ground, First } = response.data;

      setTablesByFloor({
        Ground: Ground,
        First: First
      });
    } catch (error) {
      console.error('Error fetching available tables:', error);
    }
  };
  
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    fetchTableAvailability(selectedDate, slot); 
  };

  const handleProceedClick = () => {
    setShowForm(true); 
  };

  const handleFormSubmit = async (details) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`, {
            customer: {
                ...details
            },
            date: selectedDate,
            time: selectedSlot,
            table: selectedTable.id,
        })
        setBookingDetails(response.data.booking);
    } catch (error) {
        console.log('Error Booking table', error);
    }
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setSelectedTable(null);
    setBookingDetails(null);
    setTablesByFloor({});
    setShowForm(false); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 relative">
      <h1 className="text-2xl md:text-4xl font-extrabold text-center text-blue-600 mb-6">
        Neina Restaurant Table Booking
      </h1>

      {!bookingDetails ? (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">

          {!selectedDate ? (
            <CalendarPicker onDateChange={setSelectedDate} />
          ) : !showForm ? (
            <>
              <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
                Select Time Slot and Table
              </h2>

              <TimeSlotPicker
                availableSlots={slots}
                onSlotSelect={handleSlotSelect}
              />
 
              {selectedSlot && (
                <TableGrid
                  tablesByFloor={tablesByFloor}
                  onTableSelect={setSelectedTable}
                />
              )}

              {selectedTable && !showForm && (
                <div className="mt-6 text-center">
                  <button
                    onClick={handleProceedClick}
                    className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 fixed bottom-10 right-10"
                  >
                    {`Proceed to Book ${selectedTable.id}`}
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg mt-6">
                <BookingForm table={selectedTable} onSubmit={handleFormSubmit} />
              </div>
            </>
          )}
        </div>
      ) : (
 
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Booking Confirmed 🎉
          </h2>
          <p className="text-lg mb-2">
            <strong>Date:</strong> {new Date(bookingDetails.date).toLocaleDateString()}
          </p>
          <p className="text-lg mb-2">
            <strong>Table:</strong> {bookingDetails.table}(
            {bookingDetails.customer.guests} guests)
          </p>
          <p className="text-lg mb-2">
            <strong>Time:</strong> {bookingDetails.time}
          </p>
          <p className="text-lg mb-2">
            <strong>Name:</strong> {bookingDetails.customer.name}
          </p>
          <p className="text-lg mb-2">
            <strong>Contact:</strong> {bookingDetails.customer.contact}
          </p>
          <button
            onClick={resetBooking}
            className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600"
          >
            Make Another Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
