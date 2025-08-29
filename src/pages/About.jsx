import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">About Smart Study Planner</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Smart Study Planner is designed to help students organize their study schedules efficiently. 
              You can add tasks, track progress, and manage your time effectively with our intuitive interface.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              This project was created as a capstone project to demonstrate planning, coding, and UI/UX design skills.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">Features</h2>
              <ul className="list-disc list-inside space-y-2 text-blue-700 dark:text-blue-300">
                <li>Task management with categories and priorities</li>
                <li>Pomodoro timer for focused study sessions</li>
                <li>Progress tracking and analytics</li>
                <li>Dark/Light mode support</li>
                <li>Responsive design for all devices</li>
              </ul>
            </div>

            <div className="flex gap-4 mt-8">
              <Link to="/dashboard" className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
                Get Started
              </Link>
              <a
                href="https://github.com/CallMeHoussam/smart-study-planner"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}