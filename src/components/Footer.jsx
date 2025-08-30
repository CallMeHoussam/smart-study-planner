import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>© {currentYear} Smart Study Planner. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link to="/profile" className="hover:text-white transition-colors">
              Profile
            </Link>
            <a
              href="https://github.com/CallMeHoussam/smart-study-planner"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}