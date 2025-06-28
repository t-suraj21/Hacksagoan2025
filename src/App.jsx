import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { VoiceCommandProvider } from './context/VoiceCommandProvider';
import VoiceCommandUI from './components/VoiceCommandUI';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Library from './pages/Library';
import Reader from './pages/Reader';
import TestPage from './pages/TestPage';
import Profile from './pages/Profile';
import Notebook from './pages/Notebook';
import Dashboard from './pages/Dashboard';
import Documentation from './pages/Documentation';
import PrivacyPolicy from './pages/PrivacyPolicy';
import HelpCenter from './pages/HelpCenter';
import Community from './pages/Community';
import Blog from './pages/Blog';
import KeyboardShortcuts from './pages/KeyboardShortcuts';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import { getAccessToken } from './utils/auth';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = getAccessToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public Route Component (for login/register)
const PublicRoute = ({ children }) => {
  const token = getAccessToken();
  if (token) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

function App() {
  return (
    <SettingsProvider>
      <Router>
        <VoiceCommandProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/community" element={<Community />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/keyboard-shortcuts" element={<KeyboardShortcuts />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/library"
              element={
                <ProtectedRoute>
                  <Library />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reader/book/:bookId"
              element={
                <ProtectedRoute>
                  <Reader />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <TestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/test/:classId/:subject/:chapterId"
              element={
                <ProtectedRoute>
                  <TestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notebook"
              element={
                <ProtectedRoute>
                  <Notebook />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          
          {/* Voice Command UI - appears on all pages */}
          <VoiceCommandUI />
        </VoiceCommandProvider>
      </Router>
    </SettingsProvider>
  );
}

export default App;
