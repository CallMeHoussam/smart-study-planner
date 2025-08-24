export default function Footer() {
return (
<footer className="footer">
<div className="container footer-inner">
<p>© {new Date().getFullYear()} Smart Study Planner. All rights reserved.</p>
<p className="muted">Built for the FE Capstone – Part 4 (UI & Responsiveness)</p>
</div>
</footer>
);
}