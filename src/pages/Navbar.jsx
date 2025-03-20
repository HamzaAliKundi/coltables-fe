import { useState } from "react";
import { FiSearch, FiMenu } from "react-icons/fi";
import { FaHome, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaTh } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white h-[100px] w-full flex items-center z-30 px-8 md:px-20 justify-between">
      {/* Left Logo */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="DragSpace Logo" className="h-12" />
      </div>

      {/* Middle Navigation - Desktop */}
      <div className="hidden md:flex items-center bg-gray-900 p-2 rounded-full w-[616px] h-[66px]">
        <div className="flex items-center space-x-5 px-4 text-sm">
          <Link to="/" className="flex items-center gap-2">
            <FaHome className="w-4 h-4" /> Home
          </Link>
          <Link to="/performers" className="flex items-center gap-2">
            <FaUsers className="w-4 h-4" /> Performers
          </Link>
          <Link to="/venues" className="flex items-center gap-2">
            <FaMapMarkerAlt className="w-4 h-4" /> Venues
          </Link>
          <Link to="/events" className="flex items-center gap-2">
            <FaCalendarAlt className="w-4 h-4" /> Events
          </Link>
          <Link to="/more" className="flex items-center gap-2">
            <FaTh className="w-4 h-4" /> More
          </Link>
        </div>
        {/* Search Icon */}
        <div className="ml-auto bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-4 cursor-pointer">
          <FiSearch className="text-white w-6 h-6" />
        </div>
      </div>

      {/* Right Links */}
      <div className="hidden md:flex space-x-6">
        <Link to="/registration" className="text-sm">Registration</Link>
        <Link to="/login" className="text-sm flex items-center gap-2">
          <img src="/navbar/login-icon.png" alt="Login" className="w-[19px] h-[20px]" />
          <span>Login</span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
        <FiMenu className="w-8 h-8" />
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[100px] left-0 w-full bg-gray-900 text-white flex flex-col space-y-4 p-5 md:hidden">
          <Link to="/" className="flex items-center gap-2">
            <FaHome /> Home
          </Link>
          <Link to="/performers" className="flex items-center gap-2">
            <FaUsers /> Performers
          </Link>
          <Link to="/venues" className="flex items-center gap-2">
            <FaMapMarkerAlt /> Venues
          </Link>
          <Link to="/events" className="flex items-center gap-2">
            <FaCalendarAlt /> Events
          </Link>
          <Link to="/more" className="flex items-center gap-2">
            <FaTh /> More
          </Link>
          <Link to="/registration">Registration</Link>
          <Link to="/login" className="flex items-center gap-2">
            <img src="/navbar/login-icon.png" alt="Login" className="w-4 h-4" />
            <span>Login</span>
          </Link>
        </div>
      )}
    </nav>
  );
}