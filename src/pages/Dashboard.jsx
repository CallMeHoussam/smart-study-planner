
import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList.jsx";
import Pomodoro from "../components/Pomodoro.jsx";
import { validateTask } from "../utils/Validation.js";

const Dashboard = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState({ 
    title: "", 
    subject: "", 
    focusHours: 1, 
    priority: "medium", 
    category: "General" 
  });
  const [search, setSearch] = useState("");
  const [focusMinutes, setFocusMinutes] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [activeTab, setActiveTab] = useState("tasks");
  const [categories, setCategories] = useState(["General", "Study", "Work", "Personal"]);
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedFocus = JSON.parse(localStorage.getItem("focusMinutes")) || 0;
    const savedCompleted = JSON.parse(localStorage.getItem("completedTasks")) || 0;
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || ["General", "Study", "Work", "Personal"];

    setTasks(savedTasks);
    setFocusMinutes(savedFocus);
    setCompletedTasks(savedCompleted);
    setCategories(savedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("focusMinutes", JSON.stringify(focusMinutes));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [tasks, focusMinutes, completedTasks, categories]);

  const filteredTasks = tasks.filter(
    (task) => task.title.toLowerCase().includes(search.toLowerCase())
  );

  const completedTasksCount = tasks.filter(task => task.completed).length;

  const handleAddTask = (e) => {
    e.preventDefault();

    const validation = validateTask(newTask);
    if (!validation.isValid) {
      alert(`Please fix the following errors:\n${Object.values(validation.errors).join('\n')}`);
      return;
    }

    if (!newTask.title.trim()) return;

    const updatedTasks = [
      ...tasks,
      {
        id: Date.now(),
        ...newTask,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ];
    setTasks(updatedTasks);
    setNewTask({ title: "", subject: "", focusHours: 1, priority: "medium", category: "General" });
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task, completed: !task.completed };
          if (updatedTask.completed) {
            setCompletedTasks(completedTasks + 1);
          } else {
            setCompletedTasks(completedTasks - 1);
          }
          return updatedTask;
        }
        return task;
      })
    );
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find(task => task.id === id);
    if (taskToDelete && taskToDelete.completed) {
      setCompletedTasks(completedTasks - 1);
    }
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handlePomodoroComplete = (minutes) => {
    setFocusMinutes(focusMinutes + minutes);
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const calculateProductivityScore = () => {
    const totalTasks = tasks.length;
    if (totalTasks === 0) return 0;
    return Math.round((completedTasksCount / totalTasks) * 100);
  };

  const totalFocusHours = tasks.reduce((sum, task) => sum + (task.focusHours || 0), 0);
  const completedFocusHours = tasks
    .filter(task => task.completed)
    .reduce((sum, task) => sum + (task.focusHours || 0), 0);

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updatedCategories = [...categories, newCategory.trim()];
      setCategories(updatedCategories);
      setNewTask({ ...newTask, category: newCategory.trim() });
      setNewCategory("");
      setShowCategoryInput(false);
    }
  };

  const handleCustomFocusHours = () => {
    const hours = prompt("Enter custom focus hours:");
    if (hours && !isNaN(hours) && hours > 0) {
      setNewTask({ ...newTask, focusHours: parseInt(hours) });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Study Dashboard
          </h2>
          <div className="flex items-center space-x-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow text-sm">
              <span className="text-gray-600 dark:text-gray-300">Focus: </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{focusMinutes}min</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow text-sm">
              <span className="text-gray-600 dark:text-gray-300">Tasks: </span>
              <span className="font-semibold text-green-600 dark:text-green-400">{completedTasksCount}/{tasks.length}</span>
            </div>
            <button 
              onClick={() => setShowStats(!showStats)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition text-sm"
            >
              {showStats ? "Hide Stats" : "Show Stats"}
            </button>
          </div>
        </header>

        {showStats && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h3 className="text-base font-semibold text-blue-700 dark:text-blue-300">Productivity</h3>
              <div className="text-2xl font-bold my-2 text-gray-800 dark:text-white">{calculateProductivityScore()}%</div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${calculateProductivityScore()}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h3 className="text-base font-semibold text-green-700 dark:text-green-300">Focus Time</h3>
              <div className="text-2xl font-bold my-2 text-gray-800 dark:text-white">{focusMinutes} min</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {focusMinutes > 0 ? `~${Math.round(focusMinutes/60)} hours` : "Start a session!"}
              </p>
            </div>
            
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <h3 className="text-base font-semibold text-purple-700 dark:text-purple-300">Focus Goals</h3>
              <div className="text-2xl font-bold my-2 text-gray-800 dark:text-white">{completedFocusHours}/{totalFocusHours}h</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {totalFocusHours > 0 ? `${Math.round((completedFocusHours/totalFocusHours) * 100)}% completed` : "No focus goals"}
              </p>
            </div>
          </div>
        )}

        <div className="flex border-b border-gray-200 dark:border-gray-600 mb-6">
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === "tasks" ? "text-blue-300 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-400" : "text-gray-500 dark:text-gray-100"}`}
            onClick={() => setActiveTab("tasks")}
          >
            Tasks & Timer
          </button>
          <button
            className={`py-2 px-4 text-sm font-medium ${activeTab === "analytics" ? "text-blue-300 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-400" : "text-gray-300 dark:text-gray-100"}`}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
        </div>

        {activeTab === "tasks" && (
          <>
            <div className="mb-6">
              <Pomodoro onSessionComplete={handlePomodoroComplete} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Task Manager</h3>
              
              <form
                onSubmit={handleAddTask}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4"
              >
                <input
                  type="text"
                  placeholder="Task Title *"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={newTask.subject}
                  onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
                  className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                
                <div className="relative">
                  <select
                    value={newTask.focusHours}
                    onChange={(e) => setNewTask({ ...newTask, focusHours: parseInt(e.target.value) })}
                    className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 text-gray-400 dark:text-white"
                  >
                    <option value={1}>1 hour focus</option>
                    <option value={2}>2 hours focus</option>
                    <option value={3}>3 hours focus</option>
                    <option value={4}>4 hours focus</option>
                    <option value={5}>5 hours focus</option>
                  </select>
                  
                </div>

                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  className="w-full p-3 border rounded dark:bg-gray-700 dark:border-gray-600 text-gray-400 dark:text-white"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>

                <div className="relative">
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowCategoryInput(!showCategoryInput)}
                    className="absolute right-0 top-5 transform -translate-y-5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm"
                    title="Add category"
                  >
                    +
                  </button>
                </div>

                {showCategoryInput && (
                  <div className="md:col-span-2 flex gap-2">
                    <input
                      type="text"
                      placeholder="New category name"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={addCategory}
                      className="px-3 bg-green-600 text-white rounded"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCategoryInput(false)}
                      className="px-3 bg-gray-500 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />

                <button
                  type="submit"
                  className="md:col-span-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition font-medium"
                >
                  Add Task
                </button>
              </form>

              <div className="flex justify-between items-center mb-3">
                <h4 className="text-base font-medium text-gray-800 dark:text-white">
                  Your Tasks ({tasks.length - completedTasksCount} remaining)
                </h4>
                {completedTasksCount > 0 && (
                  <button
                    onClick={clearCompletedTasks}
                    className="text-xs bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 px-2 py-1 rounded"
                  >
                    Clear Completed
                  </button>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto">
                <TaskList
                  tasks={filteredTasks}
                  toggleTaskCompletion={toggleTaskCompletion}
                  deleteTask={deleteTask}
                />
              </div>
            </div>
          </>
        )}

        {activeTab === "analytics" && (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Study Analytics</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
        <h4 className="font-medium mb-2 text-gray-800 dark:text-white">Completion Rate</h4>
        <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-600 transition-all duration-500"
            style={{ width: `${calculateProductivityScore()}%` }}
          ></div>
        </div>
        <p className="mt-2 text-center text-xs text-gray-700 dark:text-gray-300">
          {calculateProductivityScore()}% of tasks completed
        </p>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
        <h4 className="font-medium mb-2 text-gray-800 dark:text-white">Focus Statistics</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Total Focus Time:</span>
            <span className="font-medium text-blue-600 dark:text-blue-400">{focusMinutes} minutes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Focus Goals:</span>
            <span className="font-medium text-green-600 dark:text-green-400">{completedFocusHours}/{totalFocusHours}h</span>
          </div>
        </div>
      </div>
    </div>

    {}
    <div className="mb-6">
      <h4 className="font-medium mb-3 text-gray-800 dark:text-white">Task Time Analysis</h4>
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        {tasks.length > 0 ? (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex justify-between items-center p-2 bg-white dark:bg-gray-600 rounded">
                <div className="flex-1">
                  <div className="font-medium text-gray-800 dark:text-white">{task.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Category: {task.category} • Priority: {task.priority}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-blue-600 dark:text-blue-400">
                    {task.focusHours || 0}h
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {task.completed ? 'Completed' : 'Pending'}
                  </div>
                </div>
              </div>
            ))}
            
            {}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <h5 className="font-medium mb-2 text-gray-800 dark:text-white">Time by Category</h5>
              <div className="space-y-2">
                {Array.from(new Set(tasks.map(t => t.category))).map(category => {
                  const categoryTasks = tasks.filter(t => t.category === category);
                  const totalHours = categoryTasks.reduce((sum, task) => sum + (task.focusHours || 0), 0);
                  const completed = categoryTasks.filter(t => t.completed).length;
                  
                  return (
                    <div key={category} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-300">{category}</span>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {totalHours}h ({completed}/{categoryTasks.length} tasks)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">No tasks yet. Add some tasks to see analytics!</p>
        )}
      </div>
    </div>

    {}
    <div className="mb-6">
      <h4 className="font-medium mb-3 text-gray-800 dark:text-white">Productivity Insights</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Most Time-Consuming</h5>
          {tasks.length > 0 ? (
            tasks
              .filter(task => task.focusHours > 0)
              .sort((a, b) => (b.focusHours || 0) - (a.focusHours || 0))
              .slice(0, 3)
              .map((task, index) => (
                <div key={task.id} className="flex justify-between items-center text-sm mb-1">
                  <span className="text-blue-700 dark:text-blue-300">{index + 1}. {task.title}</span>
                  <span className="font-medium text-blue-800 dark:text-blue-200">{task.focusHours}h</span>
                </div>
              ))
          ) : (
            <p className="text-blue-700 dark:text-blue-300 text-sm">No data yet</p>
          )}
        </div>

        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
          <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Completion Rate</h5>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-700 dark:text-green-300">Completed Tasks</span>
              <span className="font-medium text-green-800 dark:text-green-200">{completedTasksCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-700 dark:text-green-300">Total Tasks</span>
              <span className="font-medium text-green-800 dark:text-green-200">{tasks.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-700 dark:text-green-300">Success Rate</span>
              <span className="font-medium text-green-800 dark:text-green-200">{calculateProductivityScore()}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
      <h4 className="font-medium mb-1 text-blue-700 dark:text-blue-300 text-sm">Focus Time Achievement</h4>
      <p className="text-xs text-gray-700 dark:text-gray-300">
        You've focused for {focusMinutes} minutes total. 
        {focusMinutes >= 120 ? " Great job!" : " Keep going!"}
      </p>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default Dashboard;