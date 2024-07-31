import React from 'react';
import EncodeImage from './components/EncodeImage';
import DecodeImage from './components/DecodeImage';

function App() {
  return (
    <div className="App">
      <h1>Image Steganography</h1>
      <EncodeImage />
      <DecodeImage />
    </div>
  );
}

export default App;