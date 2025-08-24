import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", subject: "", dueDate: "" });

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks whenever updated
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.subject.trim() || !newTask.dueDate) return;
    setTasks([...tasks, { ...newTask, completed: false, id: Date.now() }]);
    setNewTask({ title: "", subject: "", dueDate: "" });
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📚 Study Dashboard</h2>

      {/* Task Form */}
      <form
        onSubmit={handleAddTask}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={newTask.subject}
          onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="col-span-1 md:col-span-3 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          ➕ Add Task
        </button>
      </form>

      {/* Task List */}
      <TaskList
        tasks={tasks}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default Dashboard;
