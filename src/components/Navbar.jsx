import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/favicon.ico";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  
  const linkBaseClasses = "px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-900/40";
  const activeLinkClasses = "bg-indigo-600 text-white hover:bg-indigo-700 dark:hover:bg-indigo-700";

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <img src={logo} alt="Smart Study Planner Logo" className="w-8 h-8" />
          Study Planner
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeLinkClasses : "text-gray-700 dark:text-gray-300"}`}
          >
            Home
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeLinkClasses : "text-gray-700 dark:text-gray-300"}`}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeLinkClasses : "text-gray-700 dark:text-gray-300"}`}
          >
            Profile
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeLinkClasses : "text-gray-700 dark:text-gray-300"}`}
          >
            About
          </NavLink>
          <a
            className="btn primary ml-1"
            href="https://github.com/CallMeHoussam/smart-study-planner"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>

        <button
          onClick={handleThemeToggle}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button
          className="md:hidden inline-flex flex-col gap-1.5 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle navigation"
          onClick={handleMenuToggle}
        >
          <span className={`block h-0.5 w-5 bg-current transition ${isMenuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-current transition ${isMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-current transition ${isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="container py-3 flex flex-col gap-2">
            <NavLink 
              to="/" 
              end 
              className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeLinkClasses : "text-gray-700 dark:text-gray-300"}`} 
              onClick={handleLinkClick}
            >
              Home
            </NavLink>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeLinkClasses : "text-gray-700 dark:text-gray-300"}`} 
              onClick={handleLinkClick}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeLinkClasses : "text-gray-700 dark:text-gray-300"}`} 
              onClick={handleLinkClick}
            >
              Profile
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => `${linkBaseClasses} ${isActive ? activeLinkClasses : "text-gray-700 dark:text-gray-300"}`} 
              onClick={handleLinkClick}
            >
              About
            </NavLink>
            <a
              className="btn primary w-fit mt-2"
              href="https://github.com/CallMeHoussam/smart-study-planner"
              target="_blank"
              rel="noreferrer"
              onClick={handleLinkClick}
            >
              GitHub
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}