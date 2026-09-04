import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages (6)
import Home from './pages/Home';
import Temples from './pages/Temples';
import TempleDetails from './pages/TempleDetails';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';

// User Pages (7)
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import BookingConfirmation from './pages/BookingConfirmation';
import QRPassPage from './pages/QRPassPage';
import MyBookings from './pages/MyBookings';
import VisitHistory from './pages/VisitHistory';
import Profile from './pages/Profile';

// Admin Pages (5)
import AdminDashboard from './pages/AdminDashboard';
import CrowdMonitoring from './pages/CrowdMonitoring';
import CrowdAlerts from './pages/CrowdAlerts';
import SlotManagement from './pages/SlotManagement';
import CheckIn from './pages/CheckIn';

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-[#0D0B14] text-[#F5F0E6]">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public (6) */}
                <Route path="/" element={<Home />} />
                <Route path="/temples" element={<Temples />} />
                <Route path="/temples/:id" element={<TempleDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* User (7) */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                <Route path="/pass/:booking_id" element={<QRPassPage />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/history" element={<VisitHistory />} />
                <Route path="/profile" element={<Profile />} />

                {/* Admin (5) */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/crowd-monitoring" element={<CrowdMonitoring />} />
                <Route path="/admin/alerts" element={<CrowdAlerts />} />
                <Route path="/admin/slots" element={<SlotManagement />} />
                <Route path="/admin/checkin" element={<CheckIn />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}
