"use client";
import React, { useState } from 'react';

interface Instrument {
  name: string;
  price: number;
  image_url: string;
  like: number;
  is_new: boolean;
}

export default function MusicStore() {
  const [instruments, setInstruments] = useState<Instrument[]>([
    {
      name: "Fender Guitar",
      price: 300,
      image_url: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f",
      like: 20,
      is_new: true,
    },
    {
      name: "Gibson Les Paul",
      price: 1200,
      image_url: "https://images.unsplash.com/photo-1550985616-10810253b84d",
      like: 45,
      is_new: false,
    },
    {
      name: "Roland Keyboard",
      price: 650,
      image_url: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0",
      like: 32,
      is_new: true,
    },
    {
      name: "Yamaha Acoustic",
      price: 450,
      image_url: "https://images.unsplash.com/photo-1556449895-a33c9dba33dd",
      like: 28,
      is_new: false,
    },
    {
      name: "Pearl Drum Set",
      price: 890,
      image_url: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7",
      like: 37,
      is_new: true,
    },
    {
      name: "Selmer Saxophone",
      price: 1100,
      image_url: "https://images.unsplash.com/photo-1573871669414-010dbf73ca84",
      like: 41,
      is_new: false,
    },
    {
      name: "Ibanez Bass Guitar",
      price: 550,
      image_url: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a",
      like: 29,
      is_new: true,
    },
    {
      name: "Martin Acoustic Guitar",
      price: 780,
      image_url: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1",
      like: 33,
      is_new: false,
    },
    {
      name: "Shure Microphone",
      price: 120,
      image_url: "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742",
      like: 26,
      is_new: true,
    },
    {
      name: "Fender Amplifier",
      price: 220,
      image_url: "https://images.unsplash.com/photo-1577507529786-3356d77b068d",
      like: 22,
      is_new: false,
    }
  ]);

  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [likes, setLikes] = useState('0');
  const [isNew, setIsNew] = useState(false);

  const handleAddInstrument = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newInstrument: Instrument = {
      name: name,
      price: Number(price),
      image_url: imageUrl,
      like: Number(likes),
      is_new: isNew
    };
    
    setInstruments([...instruments, newInstrument]);
    
    // Reset form
    setImageUrl('');
    setName('');
    setPrice('');
    setLikes('0');
    setIsNew(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Music Instruments Store</h1>
      
      {/* Input Form */}
      <div style={styles.formContainer}>
        <h2 style={styles.formHeading}>Add New Instrument</h2>
        <form onSubmit={handleAddInstrument} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Image URL:</label>
            <input 
              type="text" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)}
              style={styles.input}
              placeholder="Enter image URL"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Name:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              placeholder="Enter instrument name"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Price ($):</label>
            <input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)}
              style={styles.input}
              placeholder="Enter price"
              min="0"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Likes:</label>
            <input 
              type="number" 
              value={likes} 
              onChange={(e) => setLikes(e.target.value)}
              style={styles.input}
              placeholder="Enter likes count"
              min="0"
            />
          </div>
          
          <div style={styles.checkboxGroup}>
            <input 
              type="checkbox" 
              id="isNew" 
              checked={isNew} 
              onChange={(e) => setIsNew(e.target.checked)}
              style={styles.checkbox}
            />
            <label htmlFor="isNew" style={styles.checkboxLabel}>Mark as New</label>
          </div>
          
          <button type="submit" style={styles.button}>Add Instrument</button>
        </form>
      </div>
      
      {/* Instruments Grid */}
      <div style={styles.grid}>
        {instruments.map((instrument, index) => (
          <MusicItem key={index} instrument={instrument} />
        ))}
      </div>
    </div>
  );
}

const MusicItem: React.FC<{ instrument: Instrument }> = ({ instrument }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      style={{
        ...styles.card,
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'transform 0.3s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.imageContainer}>
        <img 
          src={instrument.image_url} 
          alt={instrument.name}
          style={{
            ...styles.image,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.3s ease'
          }}
        />
        {instrument.is_new && (
          <span style={styles.newBadge}>New</span>
        )}
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{instrument.name}</h3>
        <div style={styles.details}>
          <span style={styles.price}>${instrument.price}</span>
          <div style={styles.likes}>
            <span style={styles.heart}>❤️</span>
            <span>{instrument.like}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline styles object
const styles = {
  container: {
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
  },
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto 3rem auto',
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
  formHeading: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#333',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontWeight: '500',
    color: '#333',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  checkbox: {
    width: '18px',
    height: '18px',
  },
  checkboxLabel: {
    fontWeight: '500',
    color: '#333',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background-color 0.3s',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '250px',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  imageContainer: {
    position: 'relative',
    height: '180px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  newBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#e53e3e',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  content: {
    padding: '1rem',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
    color: '#333',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#38a169',
  },
  likes: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  heart: {
    color: '#e53e3e',
    fontSize: '1rem',
  },
} as const;