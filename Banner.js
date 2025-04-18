// components/Banner.js
import React, { useState } from 'react';

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="container" style={{
      position: 'relative',
      width: '100%',
      maxWidth: '600px',
      height: '200px',
      border: '1px solid #000',
      margin: '20px auto',
      overflow: 'hidden'
    }}>
      <h1 className="banner" style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        margin: 0,
        padding: '5px 10px',
        backgroundColor: 'lightcyan',
        border: '1px solid #000',
        zIndex: 2
      }}>Banner</h1>
      
      <button 
        className="close" 
        onClick={() => setIsVisible(false)}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          cursor: 'pointer',
          border: 'none',
          backgroundColor: 'transparent',
          zIndex: 3
        }}
      >x</button>
      
      <div className="left" style={{
        position: 'absolute',
        left: 0,
        top: '50%',
        width: '50px',
        height: '100px',
        backgroundColor: 'white',
        borderRadius: '0 50px 50px 0',
        transform: 'translateY(-50%)'
      }}></div>
      
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#4CAF50',
        position: 'relative'
      }}>
        <span className="text" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '10px',
          border: '1px dashed white',
          color: 'white'
        }}>
          This is css position
        </span>
      </div>
      
      <div className="bottom" style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '20px',
        backgroundColor: '#f0f0f0'
      }}></div>
    </div>
  );
};

export default Banner;