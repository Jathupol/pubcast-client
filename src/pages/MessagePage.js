import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import MessageDisplay from '../components/MessageDisplay';

const socket = io('http://localhost:3000');

const MessagePage = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('pubcast', message);
    setMessage('');
  };

  return (
    <div>
      <h1>Message Page</h1>
      <div>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
      <MessageDisplay />
    </div>
  );
};

export default MessagePage;
