import React, { useState } from "react";

const BookingForm = ({ onSubmit, table }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    guests: 0,
  });

  const [errors, setErrors] = useState({
    name: "",
    contact: "",
    guests: "",
  });

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = "Name is required.";
    }

    const contactPattern = /^\d{10}$/;
    if (!formData.contact) {
      errors.contact = "Contact number is required.";
    } else if (!contactPattern.test(formData.contact)) {
      errors.contact = "Contact number must be a valid 10-digit number.";
    }

    if (formData.guests <= 0) {
      errors.guests = "Number of guests must be greater than 0.";
    } else if (formData.guests > table.seats) {
      errors.guests = `Number of guests cannot exceed ${table.seats}.`;
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form
      className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto border border-gray-200"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-extrabold text-blue-600 mb-6 text-center">
        Your Booking Details
      </h2>

      <div className="mb-6">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          className={`block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.name ? "border-red-500" : ""
          }`}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="contact"
        >
          Contact
        </label>
        <input
          id="contact"
          type="text"
          placeholder="Enter your contact number"
          className={`block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.contact ? "border-red-500" : ""
          }`}
          value={formData.contact}
          onChange={(e) =>
            setFormData({ ...formData, contact: e.target.value })
          }
          required
        />
        {errors.contact && (
          <p className="text-red-500 text-sm">{errors.contact}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="guests"
        >
          No. of Guests
        </label>
        <input
          id="guests"
          type="number"
          placeholder="Number of Guests"
          className={`block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.guests ? "border-red-500" : ""
          }`}
          value={formData.guests}
          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
          required
        />
        {errors.guests && (
          <p className="text-red-500 text-sm">{errors.guests}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
