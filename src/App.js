// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerForm from './components/CustomerForm';
import MessageDisplay from './components/MessageDisplay';
import ActivitySelection from './components/ActivitySelection';
import SendVideo from './components/SendVideo';
import AdvertiseImage from './components/AdvertiseImage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PaymentPage from './components/PaymentPage';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<ActivitySelection />} />
          <Route path="/customer-form" element={<CustomerForm />} />
          <Route path="/display" element={<MessageDisplay />} />
          <Route path="/request-song-tip" element={<div>Request Song + Tip Page</div>} />
          <Route path="/giveaway-warp" element={<CustomerForm />} />
          <Route path="/send-video" element={<SendVideo />} /> 
          <Route path="/advertise-image" element={<AdvertiseImage />} /> 
          <Route path="/payment" element={<PaymentPage />} /> {/* PaymentPage route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
