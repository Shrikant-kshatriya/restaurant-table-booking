import React from "react";
import { MdEventSeat } from "react-icons/md";

const TableGrid = ({ tablesByFloor, onTableSelect }) => {
  const getTableSizeClass = (seats) => {
    if (seats <= 2) return "sm:col-span-1"; // Small table
    if (seats <= 4) return "sm:col-span-2"; // Medium table
    if (seats <= 8) return "sm:col-span-2"; // Large table
    return "sm:col-span-3"; // Extra-large table
  };

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-xl">
      <h2 className="text-3xl font-extrabold text-indigo-600 mb-6 text-center">
        Select a Table
      </h2>
      {Object.entries(tablesByFloor).map(([floor, tables]) => (
        <div key={floor} className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{floor} Floor</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {tables.map((table) => (
              <div
                key={table.id}
                className={`relative col-span-1 p-6 rounded-xl shadow-md text-center cursor-pointer transition-all transform hover:scale-105 ${
                  table.booked
                    ? "bg-gray-200 cursor-not-allowed opacity-70"
                    : "bg-white hover:bg-indigo-50"
                } ${getTableSizeClass(table.seats)} min-h-[150px]`}
                onClick={() => !table.booked && onTableSelect(table)}
              >
                <h4 className="text-lg font-bold text-gray-700 mb-2 text-nowrap">
                  Table {table.id}
                </h4>
                <div className="flex justify-center items-center flex-wrap gap-2 mb-3">
                  {Array.from({ length: table.seats }).map((_, index) => (
                    <MdEventSeat
                      key={index}
                      className="text-indigo-400 text-lg"
                      aria-label="Chair Icon"
                    />
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-600">
                  {table.seats} seats
                </p>
                {table.booked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-60 rounded-xl">
                    <p className="text-gray-800 font-bold">Booked</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableGrid;
