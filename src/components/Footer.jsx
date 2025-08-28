import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 text-center py-4 mt-auto">
      <p>© {new Date().getFullYear()} Smart Study Planner. All rights reserved.</p>
    </footer>
  );
}