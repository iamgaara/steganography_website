// src/components/EncodeImage.js
import React, { useState } from 'react';

function EncodeImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState('');
  const [encodedImage, setEncodedImage] = useState('');

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const encodeImage = (image, message) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, img.width, img.height);
        const data = imgData.data;

        // Simple encoding logic
        message += String.fromCharCode(0);

        let dataIndex = 0;
        for (let i = 0; i < message.length; i++) {
          const char = message.charCodeAt(i);
          for (let bit = 0; bit < 8; bit++) {
            const bitValue = (char >> (7 - bit)) & 1;
            data[dataIndex * 4] = (data[dataIndex * 4] & 0xFE) | bitValue;
            dataIndex++;
          }
        }

        ctx.putImageData(imgData, 0, 0);
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setEncodedImage(url);
          localStorage.setItem('encodedImage', url); // Save to local storage

          // Provide download link
          const link = document.createElement('a');
          link.href = url;
          link.download = 'encoded_image.png';
          link.click();
        });
      };
    };
    reader.readAsDataURL(image);
  };

  const handleEncode = () => {
    if (selectedImage && message) {
      encodeImage(selectedImage, message);
    } else {
      alert('Please select an image and enter a message.');
    }
  };

  return (
    <div>
      <h2>Encode Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Enter message"
      />
      <button onClick={handleEncode}>Encode</button>
      {encodedImage && <img src={encodedImage} alt="Encoded" />}
    </div>
  );
}

export default EncodeImage;