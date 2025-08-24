import { Link } from 'react-router-dom';


export default function LandingPage() {
return (
<section className="landing">
<div className="hero container">
<div className="hero-text">
<h1>Plan smarter. Study calmer.</h1>
<p className="lead">
Organize tasks by subject, set priorities, and track progress – all in a clean, responsive interface.
</p>
<div className="cta-row">
<Link to="/dashboard" className="btn primary">Start Planning</Link>
<a href="#features" className="btn">Learn More</a>
</div>
</div>
<div className="hero-art" aria-hidden>
<div className="hero-card shadow">
<div className="hero-card-title">Today</div>
<ul className="hero-list">
<li><span className="dot green" /> Math – Derivatives (30m)</li>
<li><span className="dot amber" /> English – Essay Draft (45m)</li>
<li><span className="dot red" /> Physics – Lab Prep (20m)</li>
</ul>
</div>
</div>
</div>


<div id="features" className="features container">
<div className="feature">
<div className="feature-icon">🗂️</div>
<h3>Organize by subject</h3>
<p>Keep tasks grouped by subjects with clear priorities and due dates.</p>
</div>
<div className="feature">
<div className="feature-icon">⏱️</div>
<h3>Time estimates</h3>
<p>Estimate how long tasks will take and plan your day realistically.</p>
</div>
<div className="feature">
<div className="feature-icon">📱</div>
<h3>Responsive UI</h3>
<p>Works beautifully on desktop and mobile – study anywhere.</p>
</div>
</div>
</section>
);
}