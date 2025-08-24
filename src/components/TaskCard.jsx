export default function TaskCard({ task, onToggle, onDelete, onEdit }) {
const {
title,
subject,
dueDate,
estimatedMinutes,
priority,
completed,
} = task;


return (
<article className={`task-card ${completed ? 'completed' : ''}`}>
<div className="task-header">
<h3>{title}</h3>
<span className={`badge ${priority.toLowerCase()}`}>{priority}</span>
</div>


<ul className="task-meta">
<li><strong>Subject:</strong> {subject}</li>
<li><strong>Due:</strong> {new Date(dueDate).toLocaleDateString()}</li>
<li><strong>Estimate:</strong> {estimatedMinutes} min</li>
</ul>


<div className="task-actions">
<button className="btn" onClick={onToggle}>
{completed ? 'Mark Incomplete' : 'Mark Complete'}
</button>
<button className="btn" onClick={onEdit}>Edit</button>
<button className="btn danger" onClick={onDelete}>Delete</button>
</div>
</article>
);
}