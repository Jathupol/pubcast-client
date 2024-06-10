// src/components/CustomerForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CustomerForm.css'; // Import the separated CSS file
import { ThreeDotsVertical } from 'react-bootstrap-icons';

const CustomerForm = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // State for image preview
  const [rate, setRate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check rate selection
      if (!rate || !checkRateCondition(rate)) {
        alert('Please select a valid rate option before proceeding.');
        return;
      }

      const formData = new FormData();
      formData.append('username', username);
      formData.append('message', message);
      formData.append('image', image);
      formData.append('rate', rate);

      const response = await axios.post('http://localhost:3000/api/send', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);
      // Clear form fields after successful submission
      setUsername('');
      setMessage('');
      setImage(null);
      setPreviewImage(null); // Clear image preview
      setRate(null);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Generate image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleRateSelection = (selectedRate) => {
    setRate(selectedRate);
    // Reset message when rate is selected
    setMessage('');
  };

  const checkRateCondition = (selectedRate) => {
    const validRates = [
      '40 seconds for 99 THB',
      '60 seconds for 139 THB',
      '80 seconds for 169 THB',
      '40 seconds + text for 149 THB',
      '60 seconds + text for 189 THB',
      '80 seconds + text for 219 THB',
    ];

    return validRates.includes(selectedRate);
  };

  return (
    <div className="form-container">
      <h2 className="text-white">แจกวาร์ปๆๆๆๆ🎉</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Control
            type="text"
            placeholder="ใส่วาร์ปตรงนี้<3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
        </Form.Group>

        <Form.Group controlId="formMessage">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="พิมพ์ข้อความ"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-input"
            disabled={!rate || !rate.includes('text')}
          />
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Control
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="form-input"
          />
        </Form.Group>

        {previewImage && (
          <div className="image-preview">
            <Image src={previewImage} thumbnail />
          </div>
        )}

        <div className="rate-buttons-container">
          <Button
            variant={rate === '40 seconds for 99 THB' ? 'primary' : 'dark'}
            className="rate-button"
            onClick={() => handleRateSelection('40 seconds for 99 THB')}
          >
            <ThreeDotsVertical className="rate-icon" /> 40 seconds for 99 THB
          </Button>
          <Button
            variant={rate === '60 seconds for 139 THB' ? 'primary' : 'dark'}
            className="rate-button"
            onClick={() => handleRateSelection('60 seconds for 139 THB')}
          >
            <ThreeDotsVertical className="rate-icon" /> 60 seconds for 139 THB
          </Button>
          <Button
            variant={rate === '80 seconds for 169 THB' ? 'primary' : 'dark'}
            className="rate-button"
            onClick={() => handleRateSelection('80 seconds for 169 THB')}
          >
            <ThreeDotsVertical className="rate-icon" /> 80 seconds for 169 THB
          </Button>
          <Button
            variant={
              rate === '40 seconds + text for 149 THB' ? 'primary' : 'dark'
            }
            className="rate-button"
            onClick={() => handleRateSelection('40 seconds + text for 149 THB')}
          >
            <ThreeDotsVertical className="rate-icon" /> 40 seconds + text for
            149 THB
          </Button>
          <Button
            variant={
              rate === '60 seconds + text for 189 THB' ? 'primary' : 'dark'
            }
            className="rate-button"
            onClick={() => handleRateSelection('60 seconds + text for 189 THB')}
          >
            <ThreeDotsVertical className="rate-icon" /> 60 seconds + text for
            189 THB
          </Button>
          <Button
            variant={
              rate === '80 seconds + text for 219 THB' ? 'primary' : 'dark'
            }
            className="rate-button"
            onClick={() => handleRateSelection('80 seconds + text for 219 THB')}
          >
            <ThreeDotsVertical className="rate-icon" /> 80 seconds + text for
            219 THB
          </Button>
        </div>

        <Button variant="dark" type="submit" className="submit-button">
          ชำระเงิน
        </Button>
      </Form>
    </div>
  );
};

export default CustomerForm;
