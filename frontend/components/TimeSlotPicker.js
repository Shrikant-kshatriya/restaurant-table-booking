import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const TimeSlotPicker = ({ availableSlots, onSlotSelect }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    onSlotSelect(slot);
  };

  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        backgroundColor: "#fff",
        borderRadius: "50%",
        padding: "10px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <FiChevronLeft size={24} />
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        backgroundColor: "#fff",
        borderRadius: "50%",
        padding: "10px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <FiChevronRight size={24} />
    </button>
  );

  const settings = {
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
    centerMode: false,
    centerPadding: "20px",
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: "40px",
        },
      },
    ],
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-blue-600 mb-6 text-center">
        Select a Time Slot
      </h2>
      <div className="relative">
        <Slider {...settings}>
          {availableSlots.map((slot, index) => (
            <div
              key={index}
              className={`flex justify-center text-sm md:text-lg items-center bg-gray-100 text-center p-3 mx-3 rounded-lg cursor-pointer transition-all transform hover:scale-105 ${
                selectedSlot === slot
                  ? "font-bold text-blue-500 shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleSlotClick(slot)}
            >
              {slot}
            </div>
          ))}
        </Slider>
      </div>
      {selectedSlot && (
        <p className="mt-6 text-center text-blue-600 text-lg font-medium">
          Selected Slot: <span className="font-bold">{selectedSlot}</span>
        </p>
      )}
    </div>
  );
};

export default TimeSlotPicker;
