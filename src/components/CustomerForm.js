// src/components/CustomerForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Image } from 'react-bootstrap';
import { ThreeDotsVertical, Facebook, Instagram, Line, Tiktok } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CustomerForm.css'; // Import the separated CSS file

const CustomerForm = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // State for image preview
  const [rate, setRate] = useState(null);
  const [socialMedia, setSocialMedia] = useState(null); // State for selected social media

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!rate) {
        alert('Please select a rate option.');
        return;
      }

      if (!socialMedia) {
        alert('Please select a social media platform.');
        return;
      }

      const formData = new FormData();
      formData.append('username', username);
      formData.append('message', message);
      formData.append('image', image);
      formData.append('rate', rate);
      formData.append('socialMedia', socialMedia);

      const response = await axios.post(
        'http://localhost:3000/api/send',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Response:', response.data);
      // Clear form fields after successful submission
      setUsername('');
      setMessage('');
      setImage(null);
      setPreviewImage(null); // Clear image preview
      setRate(null);
      setSocialMedia(null);
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

  const handleSocialMediaSelection = (selectedMedia) => {
    setSocialMedia(selectedMedia);
  };

  return (
    <div className="form-container">
      <h2 className="text-white">แจกวาร์ปพร้อมส่งข้อความ🍻</h2>
      <Form onSubmit={handleSubmit}>
      <div className="social-media-buttons-container">
          <Button
            variant={socialMedia === 'Facebook' ? 'primary' : 'outline-primary'}
            className="social-media-button"
            onClick={() => handleSocialMediaSelection('Facebook')}
          >
            <Facebook className="social-media-icon" />
          </Button>
          <Button
            variant={socialMedia === 'Instagram' ? 'primary' : 'outline-primary'}
            className="social-media-button"
            onClick={() => handleSocialMediaSelection('Instagram')}
          >
            <Instagram className="social-media-icon" />
          </Button>
          <Button
            variant={socialMedia === 'Line' ? 'primary' : 'outline-primary'}
            className="social-media-button"
            onClick={() => handleSocialMediaSelection('Line')}
          >
            <Line className="social-media-icon" />
          </Button>
          <Button
            variant={socialMedia === 'TikTok' ? 'primary' : 'outline-primary'}
            className="social-media-button"
            onClick={() => handleSocialMediaSelection('TikTok')}
          >
            <Tiktok className="social-media-icon" />
          </Button>
        </div>
        <Form.Group controlId="formUsername">
          <Form.Control
            type="text"
            placeholder="ใส่วาร์ป"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
          />
        </Form.Group>
        

        <Form.Group controlId="formMessage">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="ข้อความ"
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
            variant={rate === '40 seconds + text for 149 THB' ? 'primary' : 'dark'}
            className="rate-button"
            onClick={() => handleRateSelection('40 seconds + text for 149 THB')}
          >
            <ThreeDotsVertical className="rate-icon" /> 40 seconds + text for 149 THB
          </Button>
          <Button
            variant={rate === '60 seconds + text for 189 THB' ? 'primary' : 'dark'}
            className="rate-button"
            onClick={() => handleRateSelection('60 seconds + text for 189 THB')}
          >
            <ThreeDotsVertical className="rate-icon" /> 60 seconds + text for 189 THB
          </Button>
          <Button
            variant={rate === '80 seconds + text for 219 THB' ? 'primary' : 'dark'}
            className="rate-button"
            onClick={() => handleRateSelection('80 seconds + text for 219 THB')}
          >
            <ThreeDotsVertical className="rate-icon" /> 80 seconds + text for 219 THB
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
