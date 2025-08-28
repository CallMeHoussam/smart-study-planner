import React, { useState, useEffect, useRef } from "react";

const Pomodoro = ({ onSessionComplete }) => {
  const [time, setTime] = useState(25 * 60); 
  const [isRunning, setIsRunning] = useState(false);
  const [sessionLength, setSessionLength] = useState(25);
  const [sessionType, setSessionType] = useState("work"); 
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            
            // Play completion sound
            if (audioRef.current) {
              audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
            
            // Show notification
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 5000);
            
            // Handle session completion
            if (sessionType === "work") {
              const newCompleted = completedSessions + 1;
              setCompletedSessions(newCompleted);
              
              // Every 4 sessions, take a longer break
              const nextSessionType = newCompleted % 4 === 0 ? "longBreak" : "break";
              setSessionType(nextSessionType);
              setSessionLength(nextSessionType === "longBreak" ? 15 : 5);
              setTime((nextSessionType === "longBreak" ? 15 : 5) * 60);
            } else {
              // Return to work session
              setSessionType("work");
              setSessionLength(25);
              setTime(25 * 60);
            }
            
            if (onSessionComplete) {
              onSessionComplete(sessionLength);
            }
            
            return sessionLength * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, sessionLength, sessionType, completedSessions, onSessionComplete]);

  // Adjust session length
  const increaseTime = () => {
    const newLength = sessionLength + 1;
    setSessionLength(newLength);
    if (!isRunning) setTime(newLength * 60);
  };

  const decreaseTime = () => {
    if (sessionLength > 1) {
      const newLength = sessionLength - 1;
      setSessionLength(newLength);
      if (!isRunning) setTime(newLength * 60);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(sessionLength * 60);
  };

  const toggleSessionType = () => {
    if (sessionType === "work") {
      setSessionType("break");
      setSessionLength(5);
      setTime(5 * 60);
    } else {
      setSessionType("work");
      setSessionLength(25);
      setTime(25 * 60);
    }
  };

  // Progress for circular progress bar
  const progress = 100 - (time / (sessionLength * 60)) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 text-center relative">
      {}
      {showNotification && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-lg shadow-lg z-10">
          Session complete! 🎉
        </div>
      )}
      
      {}
      <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3" />
      
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
        {sessionType === "work" ? "Work Session" : sessionType === "longBreak" ? "Long Break" : "Short Break"}
      </h3>
      
      {}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {}
          <circle
            className="text-gray-200 dark:text-gray-700 stroke-current"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          />
          {}
          <circle
            className="text-blue-500 stroke-current"
            strokeWidth="8"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (progress * 251.2) / 100}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="text-3xl font-mono text-gray-900 dark:text-white">
            {formatTime(time)}
          </div>
        </div>
      </div>

      {}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Completed sessions: {completedSessions}
      </div>

      {}
      <div className="flex gap-3 justify-center mb-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="btn primary px-4 py-2 rounded-lg"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg"
        >
          Reset
        </button>
        <button
          onClick={toggleSessionType}
          className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded-lg"
        >
          {sessionType === "work" ? "Take Break" : "Work Mode"}
        </button>
      </div>

      {}
      <div className="flex items-center justify-center gap-4 mt-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Session Length:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={decreaseTime}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full text-lg"
          >
            −
          </button>
          <span className="text-lg font-medium text-gray-900 dark:text-white w-8 text-center">
            {sessionLength}
          </span>
          <button
            onClick={increaseTime}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full text-lg"
          >
            +
          </button>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">minutes</span>
      </div>

      {}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => {
            setSessionType("work");
            setSessionLength(25);
            if (!isRunning) setTime(25 * 60);
          }}
          className={`px-3 py-1 text-sm rounded ${sessionType === "work" ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
        >
          Work
        </button>
        <button
          onClick={() => {
            setSessionType("break");
            setSessionLength(5);
            if (!isRunning) setTime(5 * 60);
          }}
          className={`px-3 py-1 text-sm rounded ${sessionType === "break" ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
        >
          Short Break
        </button>
        <button
          onClick={() => {
            setSessionType("longBreak");
            setSessionLength(15);
            if (!isRunning) setTime(15 * 60);
          }}
          className={`px-3 py-1 text-sm rounded ${sessionType === "longBreak" ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
        >
          Long Break
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;