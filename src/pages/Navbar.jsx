import { useState, useRef, useEffect } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import {
  FaHome,
  FaUsers,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTh,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SearchCheck } from "lucide-react";
import BookingForm from "../components/BookingForm/BookingForm";

export default function Navbar({ onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const registerTimeoutRef = useRef(null);
  const loginTimeoutRef = useRef(null);
  const loginRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const shouldShowSearch = location.pathname === "/performers" || location.pathname === "/venues" || location.pathname === "/events";

  useEffect(() => {
    return () => {
      if (registerTimeoutRef.current) clearTimeout(registerTimeoutRef.current);
      if (loginTimeoutRef.current) clearTimeout(loginTimeoutRef.current);
    };
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
    setShowRegisterDropdown(false);
    setShowLoginDropdown(false);
  };

  const handleLoginMouseEnter = () => {
    if (loginTimeoutRef.current) clearTimeout(loginTimeoutRef.current);
    setShowLoginDropdown(true);
  };

  const handleLoginMouseLeave = () => {
    loginTimeoutRef.current = setTimeout(() => {
      if (!loginRef.current?.contains(document.activeElement)) {
        setShowLoginDropdown(false);
      }
    }, 200);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchQuery("");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    
    searchTimeoutRef.current = setTimeout(() => {
      if (value.trim()) onSearch(value);
    }, 300);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onSearch("");
    setShowSearch(false);
  };

  return (
    <nav className="bg-black text-white h-[100px] max-w-[1400px] mx-auto w-full flex items-center z-30 px-8 md:px-20 justify-between relative">
      {/* Left Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img src="/logo.svg" alt="DragSpace Logo" className="h-12" />
        </Link>
      </div>

      {/* Middle Navigation - Desktop */}
      <div
        className="hidden md:flex items-center w-[450px] h-[66px] p-2 rounded-full shadow-lg backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(24, 24, 24, 0.9) 50%, rgba(255, 255, 255, 0.1) 100%)",
          boxShadow:
            "0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)",
        }}
      >
        {!showSearch ? (
          <div className="flex items-center space-x-5 px-4 text-sm w-full">
            <div className="flex flex-col items-center">
              <Link to="/" className="flex items-center gap-2">
                <FaHome className="w-4 h-4" /> Home
              </Link>
              {location.pathname === "/" && (
                <div className="w-full h-[3px] bg-[#FF00A2] rounded-[5px] mt-2"></div>
              )}
            </div>
            <div className="flex flex-col items-center">
              <Link to="/performers" className="flex items-center gap-2">
                <FaUsers className="w-4 h-4" /> Performers
              </Link>
              {location.pathname === "/performers" && (
                <div className="w-full h-[3px] bg-[#FF00A2] rounded-[5px] mt-2"></div>
              )}
            </div>
            <div className="flex flex-col items-center">
              <Link to="/venues" className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4" /> Venues
              </Link>
              {location.pathname === "/venues" && (
                <div className="w-full h-[3px] bg-[#FF00A2] rounded-[5px] mt-2"></div>
              )}
            </div>
            <div className="flex flex-col items-center">
              <Link to="/events" className="flex items-center gap-2">
                <FaCalendarAlt className="w-4 h-4" /> Events
              </Link>
              {location.pathname === "/events" && (
                <div className="w-full h-[3px] bg-[#FF00A2] rounded-[5px] mt-2"></div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full px-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="w-5 h-5 text-[#FF00A2]" />
              </div>
              <input
                type="text"
                placeholder={`Search ${location.pathname === "/venues" ? "venues" : location.pathname === "/events" ? "events" : "performers"} ...`}
                className="w-full bg-transparent border-2 border-[#FF00A2] rounded-full text-white focus:outline-none py-3 pl-10 pr-12 transition-all duration-300"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                autoFocus
              />
              <button
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#FF00A2] hover:text-white transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            {isSearchFocused && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#1E1E1E] rounded-lg shadow-lg p-4 z-50">
                <div className="flex items-center gap-2 text-[#FF00A2] mb-2">
                  <FiSearch className="w-4 h-4" />
                  <span>Searching for: {searchQuery}</span>
                </div>
                <div className="text-sm text-gray-400">
                  Press Enter to search or wait for results...
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search Icon - Only shows when search is closed and on performers/venues/events page */}
        {!showSearch && shouldShowSearch && (
          <div
            className="ml-auto bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setShowSearch(true)}
          >
            <FiSearch className="text-white w-6 h-6" />
          </div>
        )}
      </div>

      {/* Right Links with Dropdowns */}
      <div className="hidden md:flex items-center space-x-6">
        {/* Book a Performer Button */}
        <button
          onClick={() => setShowBookingForm(true)}
          className="text-lg text-white hover:text-[#FF00A2] transition-colors flex items-center gap-2"
        >
          <span>Book a performer</span>
        </button>

        {/* Login Dropdown */}
        <div 
          className="relative"
          ref={loginRef}
          onMouseEnter={handleLoginMouseEnter}
          onMouseLeave={handleLoginMouseLeave}
        >
          <button
            className="text-lg text-white hover:text-[#FF00A2] transition-colors flex items-center gap-2"
          >
            <img
              src="/home/navbar/login-icon.svg"
              alt="Login"
              className="w-[25px] h-[26px]"
            />
            <span>Login</span>
          </button>
          {showLoginDropdown && (
            <div 
              className="absolute top-full right-0 mt-2 w-48 bg-[#2A2A2A] rounded-lg shadow-lg py-2 z-50"
              onMouseEnter={handleLoginMouseEnter}
              onMouseLeave={handleLoginMouseLeave}
            >
              <a
                href="https://performer.dragspace.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-white hover:bg-[#FF00A2] hover:text-white transition-colors"
                onClick={handleLinkClick}
              >
                <div className="flex items-center gap-2">
                  <img src="/home/navbar/login-icon.svg" alt="Performer" className="w-4 h-4" />
                  <span>Login as Performer</span>
                </div>
              </a>
              <a
                href="https://venue.dragspace.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-white hover:bg-[#FF00A2] hover:text-white transition-colors"
                onClick={handleLinkClick}
              >
                <div className="flex items-center gap-2">
                  <img src="/home/navbar/login-icon.svg" alt="Venue" className="w-4 h-4" />
                  <span>Login as Venue</span>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
        {isOpen ? <FiX className="w-8 h-8" /> : <FiMenu className="w-8 h-8" />}
      </button>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[100px] left-0 w-full bg-gray-900 text-white flex flex-col space-y-4 p-5 md:hidden z-50 shadow-lg"
          >
            <Link
              to="/"
              className="flex items-center gap-2 py-2"
              onClick={handleLinkClick}
            >
              <FaHome /> Home
            </Link>
            <Link
              to="/performers"
              className="flex items-center gap-2 py-2"
              onClick={handleLinkClick}
            >
              <FaUsers /> Performers
            </Link>
            <Link
              to="/venues"
              className="flex items-center gap-2 py-2"
              onClick={handleLinkClick}
            >
              <FaMapMarkerAlt /> Venues
            </Link>
            <Link
              to="/events"
              className="flex items-center gap-2 py-2"
              onClick={handleLinkClick}
            >
              <FaCalendarAlt /> Events
            </Link>

            {/* Mobile Book a Performer Button */}
            <button
              onClick={() => {
                setShowBookingForm(true);
                handleLinkClick();
              }}
              className="flex items-center gap-2 py-2 text-left"
            >
              <span>Book a performer</span>
            </button>

            {/* Mobile Login Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                className="flex items-center gap-2 py-2 w-full text-left"
              >
                <img
                  src="/home/navbar/login-icon.svg"
                  alt="Login"
                  className="w-4 h-4"
                />
                <span>Login</span>
              </button>
              {showLoginDropdown && (
                <div className="pl-4 space-y-2">
                  <a
                    href="https://performer.dragspace.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-2 text-sm text-white hover:text-[#FF00A2] transition-colors"
                    onClick={handleLinkClick}
                  >
                    <img src="/home/navbar/login-icon.svg" alt="Performer" className="w-4 h-4" />
                    <span>Login as Performer</span>
                  </a>
                  <a
                    href="https://venue.dragspace.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-2 text-sm text-white hover:text-[#FF00A2] transition-colors"
                    onClick={handleLinkClick}
                  >
                    <img src="/home/navbar/login-icon.svg" alt="Venue" className="w-4 h-4" />
                    <span>Login as Venue</span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Form Modal */}
      <BookingForm 
        isOpen={showBookingForm} 
        onClose={() => setShowBookingForm(false)} 
      />
    </nav>
  );
}
