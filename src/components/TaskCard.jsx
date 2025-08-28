export default function TaskCard({ task, onToggle, onDelete, onEdit }) {
  const {
    title = "Untitled task",
    subject = "General",
    dueDate,
    estimatedMinutes = 25,
    priority = "Normal",
    completed = false,
  } = task || {};

  const priorityStyle = {
    low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    normal: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    high: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    urgent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  }[(priority || "normal").toLowerCase()];

  return (
    <article className={`rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow ${completed ? "opacity-70" : ""}`}>
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className={`px-2 py-1 text-xs rounded ${priorityStyle}`}>{priority}</span>
      </div>

      <ul className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-1">
        <li><strong>Subject:</strong> {subject}</li>
        {dueDate && <li><strong>Due:</strong> {new Date(dueDate).toLocaleDateString()}</li>}
        <li><strong>Estimate:</strong> {estimatedMinutes} min</li>
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600" onClick={onToggle}>
          {completed ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600" onClick={onEdit}>
          Edit
        </button>
        <button className="btn bg-red-600 text-white hover:bg-red-700" onClick={onDelete}>
          Delete
        </button>
      </div>
    </article>
  );
}
