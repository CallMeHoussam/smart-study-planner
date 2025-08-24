import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';


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