// src/components/MessageDisplay.js

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Container, Card, Button } from 'react-bootstrap';
import { Instagram } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import '../css/MessageDisplay.css';

const socket = io('http://localhost:3000');

const MessageDisplay = () => {
  const [message, setMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId = null;

    socket.on('new_message', (data) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      setMessage(data);
      setShowMessage(true);

      timeoutId = setTimeout(() => {
        setShowMessage(false);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }, 30000);
    });

    return () => {
      socket.off('new_message');
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const handleDeleteMessage = () => {
    setShowMessage(false);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handlePayNow = () => {
    // Navigate to PaymentPage
    navigate('/payment');
  };

  return (
    <Container fluid className="message-container">
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
            <Button variant="dark" onClick={handlePayNow}>
              ชำระเงิน
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default MessageDisplay;
