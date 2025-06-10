// App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, AuthContext } from './contexts/Authprovider';

import Register from "./pages/Register";
import Login from "./pages/Login";
import PasswordResetRequest from "./pages/PasswordResetRequest";
import PasswordResetConfirm from "./pages/PasswordResetConfirm";

import Home from "./userdashboard/Home";
import Admin from "./admindashboard/Admin";
import Operator from "./operatordashboard/Operator";

import OverviewTab from "./admindashboard/OverviewTab";
import BookingsTab from "./admindashboard/BookingsTab";
import ToursTab from "./admindashboard/ToursTab";
import Customers from "./admindashboard/Customers";
import Impacts from "./admindashboard/Impacts";
import LandingPage from './pages/LandingPage';
import Profile from './userdashboard/Profile';
import Tours from './userdashboard/Tours';
import Booking from './userdashboard/Booking';
import Contact from './userdashboard/Contact';
import Explore from './userdashboard/Explore';
import Payment from './userdashboard/Payment';



// PrivateRoute: Protect routes by auth and role
function PrivateRoute({ allowedRoles }) {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is defined and not empty, check if user has at least one
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.some(role => auth[role])) {
    return <Navigate to="/user-dashboard" replace />;
  }

  // Authenticated and authorized
  return <Outlet />;
}


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<PasswordResetRequest />} />
            <Route path="/reset-password-confirm/:uidb64/:token" element={<PasswordResetConfirm />} />

            {/* User Dashboard - any authenticated user */}
            <Route element={<PrivateRoute allowedRoles={['is_admin', 'is_operator']} />}>
              {/* Admin routes */}
              <Route path="/admin-dashboard" element={<Admin />}>
                <Route index element={<OverviewTab />} />
                <Route path="bookings" element={<BookingsTab />} />
                <Route path="tours" element={<ToursTab />} />
                <Route path="customers" element={<Customers />} />
                <Route path="impacts" element={<Impacts />} />
              </Route>

              {/* Operator routes */}
              <Route path="/operator-dashboard" element={<Operator />} />
            </Route>

            {/* Regular user dashboard - any logged-in user */}
            <Route element={<PrivateRoute allowedRoles={[]} />}>
              <Route path="/user-dashboard" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/payment" element={<Payment />} /> 
            </Route>

            {/* Redirect any other paths to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
