import React, { useState, useEffect, useRef } from "react";

const Pomodoro = ({ onSessionComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionLength, setSessionLength] = useState(25);
  const [sessionType, setSessionType] = useState("work");
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  
  const timerIntervalRef = useRef(null);
  const audioRef = useRef(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining((previousTime) => {
          if (previousTime <= 1) {
            clearInterval(timerIntervalRef.current);
            setIsRunning(false);
            
            if (audioRef.current) {
              audioRef.current.play().catch(error => console.log("Audio play failed:", error));
            }
            
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 5000);
            
            if (sessionType === "work") {
              const newCompletedCount = completedSessions + 1;
              setCompletedSessions(newCompletedCount);
              
              const nextSessionType = newCompletedCount % 4 === 0 ? "longBreak" : "break";
              const nextSessionLength = nextSessionType === "longBreak" ? 15 : 5;
              
              setSessionType(nextSessionType);
              setSessionLength(nextSessionLength);
              setTimeRemaining(nextSessionLength * 60);
            } else {
              setSessionType("work");
              setSessionLength(25);
              setTimeRemaining(25 * 60);
            }
            
            if (onSessionComplete) {
              onSessionComplete(sessionLength);
            }
            
            return sessionLength * 60;
          }
          return previousTime - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(timerIntervalRef.current);
  }, [isRunning, sessionLength, sessionType, completedSessions, onSessionComplete]);

  const increaseSessionLength = () => {
    const newLength = sessionLength + 1;
    setSessionLength(newLength);
    if (!isRunning) setTimeRemaining(newLength * 60);
  };

  const decreaseSessionLength = () => {
    if (sessionLength > 1) {
      const newLength = sessionLength - 1;
      setSessionLength(newLength);
      if (!isRunning) setTimeRemaining(newLength * 60);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(sessionLength * 60);
  };

  const toggleSessionType = () => {
    if (sessionType === "work") {
      setSessionType("break");
      setSessionLength(5);
      setTimeRemaining(5 * 60);
    } else {
      setSessionType("work");
      setSessionLength(25);
      setTimeRemaining(25 * 60);
    }
  };

  const progressPercentage = 100 - (timeRemaining / (sessionLength * 60)) * 100;
  const circleCircumference = 251.2;

  const getSessionTypeDisplay = () => {
    switch (sessionType) {
      case "work": return "Work Session";
      case "longBreak": return "Long Break";
      default: return "Short Break";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 text-center relative">
      {showNotification && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-lg shadow-lg z-10">
          Session complete! 🎉
        </div>
      )}
      
      <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3" />
      
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
        {getSessionTypeDisplay()}
      </h3>
      
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 dark:text-gray-700 stroke-current"
            strokeWidth="8"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
          />
          <circle
            className="text-blue-500 stroke-current"
            strokeWidth="8"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference - (progressPercentage * circleCircumference) / 100}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="text-3xl font-mono text-gray-900 dark:text-white">
            {formatTime(timeRemaining)}
          </div>
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Completed sessions: {completedSessions}
      </div>

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

      <div className="flex items-center justify-center gap-4 mt-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Session Length:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={decreaseSessionLength}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full text-lg"
          >
            −
          </button>
          <span className="text-lg font-medium text-gray-900 dark:text-white w-8 text-center">
            {sessionLength}
          </span>
          <button
            onClick={increaseSessionLength}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full text-lg"
          >
            +
          </button>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-400">minutes</span>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => {
            setSessionType("work");
            setSessionLength(25);
            if (!isRunning) setTimeRemaining(25 * 60);
          }}
          className={`px-3 py-1 text-sm rounded ${sessionType === "work" ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
        >
          Work
        </button>
        <button
          onClick={() => {
            setSessionType("break");
            setSessionLength(5);
            if (!isRunning) setTimeRemaining(5 * 60);
          }}
          className={`px-3 py-1 text-sm rounded ${sessionType === "break" ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
        >
          Short Break
        </button>
        <button
          onClick={() => {
            setSessionType("longBreak");
            setSessionLength(15);
            if (!isRunning) setTimeRemaining(15 * 60);
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