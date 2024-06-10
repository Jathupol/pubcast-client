// src/components/AdvertiseImage.js
import React, { useState } from 'react';
import axios from 'axios';

const AdvertiseImage = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.post('http://localhost:3000/api/advertise-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response:', response.data);
      setImage(null); // Clear the image state after successful submission
    } catch (error) {
      console.error('Error advertising image:', error);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <h2>Advertise Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <br />
        <button type="submit">Advertise Image</button>
      </form>
    </div>
  );
};

export default AdvertiseImage;
