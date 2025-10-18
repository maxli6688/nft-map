import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Karmaverse NFT Map</h1>
        <p className="description">
          Decentralized map for Karmaverse NFTs, showing NFT locations and allowing interactions
        </p>
        <p className="note">This is a feature demonstration</p>
        <button className="enter-button" onClick={() => navigate('/map')}>
          Enter Map
        </button>
      </div>
    </div>
  );
};

export default HomePage;
