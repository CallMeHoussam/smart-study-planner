function TaskItem({ task, index, toggleComplete, deleteTask }) {
  return (
    <li>
      <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.text}
      </span>
      <button onClick={() => toggleComplete(index)}>✓</button>
      <button onClick={() => deleteTask(index)}>X</button>
    </li>
  );
}
export default TaskItem;
