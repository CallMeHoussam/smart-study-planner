import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = task.trim();
    if (!text) {return};
    addTask(text);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={task}
        placeholder="Enter a study task…"
        onChange={(e) => setTask(e.target.value)}
        className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button type="submit" className="btn primary">Add</button>
    </form>
  );
}
