import React from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";


function App() {
return (
<div className="app-shell">
<Navbar />
<main className="container">
<Routes>
<Route path="/" element={<LandingPage />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/profile" element={<Profile />} />
</Routes>
</main>
<Footer />
</div>
);
}


export default App;