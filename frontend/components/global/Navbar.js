'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-indigo-600 p-4 shadow-md">
      <div className="mx-auto px-8 flex justify-between items-center">
        <div className="text-white font-bold text-xl md:text-3xl cursor-pointer" onClick={() => router.push('/')}>
          Neina
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <button
            onClick={() => router.push('/')}
            className="text-white text-lg hover:text-blue-200"
          >
            Home
          </button>
          <button
            onClick={() => router.push('/mybooking')}
            className="text-white text-lg hover:text-blue-200"
          >
            My Booking
          </button>
          <button
            onClick={() => router.push('/admin')}
            className="text-white text-lg hover:text-blue-200"
          >
            Admin
          </button>
          <button
            onClick={() => router.push('/booking')}
            className="font-semibold text-lg hover:text-white hover:bg-indigo-400 bg-white rounded-full py-2 px-6 text-indigo-700"
          >
            Book a Table
          </button>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes className="text-white text-2xl" /> : <FaBars className="text-white text-2xl" />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 text-white space-y-4 py-4 mt-4 px-6">
          <button
            onClick={() => {
              router.push('/');
              setIsMenuOpen(false);
            }}
            className="block text-lg"
          >
            Home
          </button>
          <button
            onClick={() => {
              router.push('/booking');
              setIsMenuOpen(false);
            }}
            className="block text-lg"
          >
            Book a Table
          </button>
          <button
            onClick={() => {
              router.push('/mybooking');
              setIsMenuOpen(false);
            }}
            className="block text-lg"
          >
            My bookings
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
