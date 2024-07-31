import React, { useState } from 'react';

// Example list of image filenames (update with actual filenames as needed)
const imageOptions = [
  'encodedImage.png', // Replace with actual filenames in your public/static folder
  // Add more filenames here if needed
];

const DecodeImage = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [decodedMessage, setDecodedMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (event) => {
    setSelectedImage(event.target.value);
  };

  const checkImageExists = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      console.error('Error checking image existence:', error);
      return false;
    }
  };

  const decodeImage = (url) => {
    console.log('Decoding image from URL:', url);
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Handle CORS issues if needed
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imgData.data;

      let message = '';
      let charCode = 0;
      let bitCount = 0;

      for (let i = 0; i < data.length; i += 4) {
        const bit = data[i] & 1;
        charCode = (charCode << 1) | bit;
        bitCount++;

        if (bitCount === 8) {
          const char = String.fromCharCode(charCode);
          if (char === '\0') break; // End of message
          message += char;
          charCode = 0;
          bitCount = 0;
        }
      }

      setDecodedMessage(message.trim());
      setErrorMessage('');
    };
    img.onerror = () => {
      console.error('Error loading image');
      setDecodedMessage('');
      setErrorMessage('Error loading image');
    };
  };

  const handleDecode = async () => {
    if (selectedImage) {
      const url = `/static/${selectedImage}`;
      const imageExists = await checkImageExists(url);

      if (imageExists) {
        decodeImage(url);
      } else {
        setDecodedMessage('');
        setErrorMessage('Image not present');
      }
    } else {
      setDecodedMessage('');
      setErrorMessage('No image selected');
    }
  };

  return (
    <div>
      <h2>Decode Image</h2>
      <select onChange={handleImageChange} value={selectedImage}>
        <option value="">Select an image</option>
        {imageOptions.map((image, index) => (
          <option key={index} value={image}>{image}</option>
        ))}
      </select>
      <button onClick={handleDecode} disabled={!selectedImage}>Decode</button>
      <p>Decoded Message: {decodedMessage}</p>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default DecodeImage;
