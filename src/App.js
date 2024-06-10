// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerForm from './components/CustomerForm';
import MessageDisplay from './components/MessageDisplay';
import ActivitySelection from './components/ActivitySelection';
import SendVideo from './components/SendVideo'; // Import the new component for sending video
import AdvertiseImage from './components/AdvertiseImage'; // Import the new component for advertising image
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import the separated CSS file

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<ActivitySelection />} />
          <Route path="/customer-form" element={<CustomerForm />} />
          <Route path="/display" element={<MessageDisplay />} />
          <Route path="/request-song-tip" element={<div>Request Song + Tip Page</div>} />
          <Route path="/giveaway-warp" element={<CustomerForm />} /> {/* Change to MessageDisplay for giveaway warp */}
          <Route path="/send-video" element={<SendVideo />} /> {/* New route for sending video */}
          <Route path="/advertise-image" element={<AdvertiseImage />} /> {/* New route for advertising image */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
