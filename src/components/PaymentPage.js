// src/components/PaymentPage.js

import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentPage = () => {
  const { rate, username, message, imageUrl } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle payment submission
    // For example, you can send a request to the backend to process the payment
    console.log('Handling payment submission...');
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <p>Rate: {rate}</p>
      <p>Username: {username}</p>
      <p>Message: {message}</p>
      <p>Image URL: {imageUrl}</p>
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentPage;
