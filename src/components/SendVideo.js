// src/components/SendVideo.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/SendVideo.css'
const SendVideo = () => {
  const [video, setVideo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('video', video);

      const response = await axios.post('http://localhost:3000/api/send-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response:', response.data);
      setVideo(null); // Clear the video state after successful submission
    } catch (error) {
      console.error('Error sending video:', error);
    }
  };

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  return (
    <div>
      <h2>Send Video to Screen</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        <br />
        <button type="submit">Send Video</button>
      </form>
    </div>
  );
};

export default SendVideo;
