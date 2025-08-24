import React, { useState } from "react";


export default function Profile() {
const [name, setName] = useState(localStorage.getItem("ssp_name") || "");
const [goal, setGoal] = useState(localStorage.getItem("ssp_goal") || "");


const handleSave = () => {
localStorage.setItem("ssp_name", name);
localStorage.setItem("ssp_goal", goal);
alert("Profile updated successfully!");
};


return (
<div className="page-container">
<h1>Profile</h1>
<div className="form-group">
<label>Name</label>
<input
type="text"
value={name}
onChange={(e) => setName(e.target.value)}
placeholder="Enter your name"
/>
</div>
<div className="form-group">
<label>Study Goal</label>
<input
type="text"
value={goal}
onChange={(e) => setGoal(e.target.value)}
placeholder="E.g., Finish algorithms module"
/>
</div>
<button className="btn-primary" onClick={handleSave}>Save</button>
</div>
);
}