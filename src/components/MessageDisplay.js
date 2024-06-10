// src/components/MessageDisplay.js

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card } from 'react-bootstrap';
import { Instagram } from 'react-bootstrap-icons';
import '../css/MessageDisplay.css'; // Import the separated CSS file

const socket = io('http://localhost:3000');

const MessageDisplay = () => {
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let timeoutId = null;

    socket.on('new_message', (data) => {
      // Clear previous timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      setMessage(data);
      setShowMessage(true); // Show the message with animation

      // Set timeout to clear message after 30 seconds
      timeoutId = setTimeout(() => {
        setShowMessage(false); // Hide the message with animation
        setTimeout(() => {
          setMessage(null);
        }, 3000); // Match the duration of the hide animation
      }, 30000);
    });

    return () => {
      // Clean up socket listener and timeout
      socket.off('new_message');
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const handleDeleteMessage = () => {
    setShowMessage(false); // Hide the message with animation
    setTimeout(() => {
      setMessage(null);
    }, 3000); // Match the duration of the hide animation
  };

  return (
    <Container fluid className="message-container">
      {/* Background video */}
      <iframe
        title="Background Video"
        className="background-video"
        src="https://www.youtube.com/embed/9FvvbVI5rYA?autoplay=1&loop=1&controls=0&mute=1"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      {message && (
        <Card className={`message-card ${showMessage ? 'show' : 'hide'}`}>
          <Card.Body>
            <div className="username-container">
              <Instagram className="instagram-icon me-2" />
              <Card.Title>{message.username}</Card.Title>
            </div>
            {message.imageUrl && (
              <div className="mb-3">
                <Card.Img
                  src={`http://localhost:3000${message.imageUrl}`}
                  alt="Uploaded"
                  className="message-image"
                />
              </div>
            )}
            <Card.Text>{message.message}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default MessageDisplay;
