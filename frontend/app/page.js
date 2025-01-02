"use client";

import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const navigateToBooking = () => {
    router.push("/booking");
  };

  return (
    <div className="min-h-screen p-8 sm:p-6 lg:p-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white">
      <h1 className="lg:text-5xl text-3xl font-extrabold mt-10 lg:mt-0 mb-6 text-center">
        Welcome to Neina Table Reservations
      </h1>
      <p className="lg:text-lg text-sm text-center max-w-2xl mb-8">
        Reserve your perfect table effortlessly with our restaurant booking system. Select your
        preferred date, time, and table in just a few clicks.
      </p>
      <button
        onClick={navigateToBooking}
        className="px-8 py-4 bg-white text-blue-500 font-bold text-lg rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
      >
        Book a Table Now
      </button>
      <div className="mt-12 max-w-[1200px] flex flex-col lg:flex-row gap-8">
        <div className="p-6 bg-white bg-opacity-20 rounded-lg shadow-lg">
          <h3 className="lg:text-2xl text-lg font-bold">Easy to Use</h3>
          <p className="mt-2 lg:text-md text-sm">
            Intuitive design ensures a seamless reservation experience for all users.
          </p>
        </div>
        <div className="p-6 bg-white bg-opacity-20 rounded-lg shadow-lg">
          <h3 className="lg:text-2xl text-lg font-bold">Flexible Options</h3>
          <p className="mt-2 lg:text-md text-sm">
            Choose the perfect table for your group with availability at a glance.
          </p>
        </div>
        <div className="p-6 bg-white bg-opacity-20 rounded-lg shadow-lg">
          <h3 className="lg:text-2xl text-lg font-bold">Responsive Design</h3>
          <p className="mt-2 lg:text-md text-sm">
            Enjoy a flawless experience on both desktop and mobile devices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
