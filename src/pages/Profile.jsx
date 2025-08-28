import React, { useState, useEffect } from "react";

export default function Profile() {
  const [name, setName] = useState(localStorage.getItem("ssp_name") || "");
  const [goal, setGoal] = useState(localStorage.getItem("ssp_goal") || "");
  const [showProfile, setShowProfile] = useState(false);
  const [focusMinutes, setFocusMinutes] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    if (name && goal) {
      setShowProfile(true);
    }

    const savedFocus = JSON.parse(localStorage.getItem("focusMinutes")) || 0;
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedCompleted = JSON.parse(localStorage.getItem("completedTasks")) || 0;

    setFocusMinutes(savedFocus);
    setTotalTasks(savedTasks.length);
    setCompletedTasks(savedCompleted);
  }, [name, goal]);

  const handleSave = () => {
    localStorage.setItem("ssp_name", name);
    localStorage.setItem("ssp_goal", goal);
    setShowProfile(true);
  };

  const calculateProgress = () => {
    if (totalTasks === 0) return 0;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  const getFocusLevel = () => {
    if (focusMinutes >= 300) return "Expert";
    if (focusMinutes >= 150) return "Advanced";
    if (focusMinutes >= 60) return "Intermediate";
    return "Beginner";
  };

  const getHoursFocused = () => {
    return (focusMinutes / 60).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Profile Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Manage your personal information and track your progress</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Study Goal</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="E.g., Finish algorithms module"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 w-full md:w-auto"
            onClick={handleSave}
          >
            Save Profile
          </button>

          {/* Stats Section */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Progress</h2>
            
            <div className="flex flex-col items-center mb-6">
              {/* Circular Progress Bar with Initial */}
              <div className="relative w-40 h-40 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200 dark:text-gray-700 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  />
                  <circle
                    className="text-blue-600 stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (calculateProgress() * 251.2) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                    {name ? name.charAt(0).toUpperCase() : "?"}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">{calculateProgress()}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{getHoursFocused()}h</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Focus</p>
              </div>
              
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completedTasks}/{totalTasks}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tasks Completed</p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{getFocusLevel()}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Focus Level</p>
              </div>
            </div>
          </div>
        </div>

        {/* Small Profile Corner */}
        {showProfile && (
          <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-4 w-72 z-50 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                  {name ? name.charAt(0).toUpperCase() : "?"}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-gray-800 dark:text-white truncate">{name || "No Name"}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{goal || "No Goal"}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium text-gray-800 dark:text-white">{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs pt-1">
                <span className="text-gray-600 dark:text-gray-400">{getHoursFocused()}h focused</span>
                <span className="text-blue-600 dark:text-blue-400">{getFocusLevel()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}