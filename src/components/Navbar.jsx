import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';


export default function Navbar() {
const [open, setOpen] = useState(false);


return (
<header className="nav-root">
<div className="nav-inner container">
<Link to="/" className="brand">
<span className="brand-dot" /> Smart Study Planner
</Link>


<button
className={`burger ${open ? 'is-open' : ''}`}
aria-label="Toggle navigation"
onClick={() => setOpen(!open)}
>
<span />
<span />
<span />
</button>


<nav className={`nav-links ${open ? 'show' : ''}`} onClick={() => setOpen(false)}>
<NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
<NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
<NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
<a
className="btn primary"
href="https://github.com/your-username/smart-study-planner"
target="_blank"
rel="noreferrer"
>GitHub</a>
</nav>
</div>
</header>
);
}