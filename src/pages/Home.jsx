import React from "react";
import { Link } from "react-router-dom";


export default function Home() {
return (
<div className="home-container">
<h1>Welcome to Smart Study Planner</h1>
<p>Plan your studies, manage your time, and achieve your goals.</p>
<Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
</div>
);
}