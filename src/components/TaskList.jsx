function TaskItem({ task, index, toggleComplete, deleteTask }) {
  const completedCount = tasks.filter(task => task.completed).length;
  const progress = (completedCount / tasks.length) * 100 || 0;

  return (
    <li>
      <div className="progress-container">
  <div className="progress-bar" style={{ width: `${progress}%` }}></div>
</div>
<p>{completedCount} / {tasks.length} tasks completed</p>
<TaskList tasks={filteredTasks} setTasks={setTasks} />
      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.text}
      </span>
      <span className={`category-badge ${task.category.toLowerCase()}`}>
    {task.category}
    </span>

      <button onClick={() => toggleComplete(index)}>✓</button>
      <button onClick={() => deleteTask(index)}>X</button>
    </li>
  );
}
export default TaskItem;
