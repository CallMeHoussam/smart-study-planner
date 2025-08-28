import React from "react";

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask }) => {
  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks yet. Add one above!</p>;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex justify-between items-center p-3 border rounded-lg dark:border-gray-600"
        >
          <div>
            <h4
              className={`font-semibold ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {task.subject} — Due: {task.dueDate}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toggleTaskCompletion(task.id)}
              className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              {task.completed ? "Undo" : "Done"}
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
