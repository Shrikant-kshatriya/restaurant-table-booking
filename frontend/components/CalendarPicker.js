import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarPicker = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
        Choose Your Reservation Date
      </h2>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          className="mx-auto border border-gray-200 rounded-lg shadow-sm"
          tileClassName={({ date, view }) =>
            view === "month"
              ? date.toDateString() === selectedDate.toDateString()
                ? "bg-blue-500 text-white font-semibold rounded-lg"
                : "hover:bg-blue-100 rounded-lg"
              : null
          }
          next2Label={null}
          prev2Label={null}
        />
      </div>
      <p className="mt-6 text-gray-700 text-center">
        Selected Date:{" "}
        <span className="font-semibold text-blue-500">
          {selectedDate.toDateString()}
        </span>
      </p>
    </div>
  );
};

export default CalendarPicker;
