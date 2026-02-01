import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingScreen from './components/LandingScreen';
import SignupScreen from './components/SignupScreen';
import ProfileScreen from './components/ProfileScreen';
import CommentsScreen from './components/CommentsScreen';
import LoginScreen from './components/LoginScreen';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/comments" element={<CommentsScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;