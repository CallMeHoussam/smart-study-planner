export default function TaskItem({ task, index, toggleComplete, deleteTask }) {
  return (
    <li className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(index)}
          className="h-4 w-4 accent-indigo-600"
        />
        <span className={`text-sm sm:text-base ${task.completed ? "line-through text-gray-400" : ""}`}>
          {task.text}
        </span>
      </div>
      <button
        onClick={() => deleteTask(index)}
        className="text-red-600 hover:text-red-700 text-sm"
        aria-label="Delete task"
      >
        Delete
      </button>
    </li>
  );
}
