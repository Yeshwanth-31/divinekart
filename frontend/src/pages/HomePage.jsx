import React, { useState, useEffect } from 'react';
import './HomePage.css';
import axios from 'axios';
import LoginPopup from '../components/LoginPopup';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogin(true), 20000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const filteredProducts =
    filter === 'All'
      ? products
      : products.filter((product) => product.category === filter);

  return (
    <div className={`homepage-container ${darkMode ? 'dark' : ''}`}>
      {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />}

      <nav className="navbar">
        <h1 className="logo">🛕 Divine Kart</h1>
        <input type="text" placeholder="Search..." className="search-bar" />

        <div className="nav-links">
          <Link to="/blog" className="nav-link">Blog</Link>
          <Link to="/cart" className="nav-link">Cart</Link>

          <div className="profile-container">
            <FaUserCircle size={28} className="profile-icon" />
            <div className="profile-dropdown">
              <span className="profile-option" onClick={() => setShowLogin(true)}>Login</span>
              <Link to="/profile" className="profile-option">Profile</Link>

              <div className="theme-toggle">
                <span>Dark Theme</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="filters">
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Deity Statues')}>Deity Statues</button>
        <button onClick={() => setFilter('Puja Accessories')}>Puja Accessories</button>
        <button onClick={() => setFilter('Water Pots')}>Sacred Water Pots</button>
        <button onClick={() => setFilter('Decorative Arches')}>Decorative Arches</button>
      </div>

      <div className="catalogue">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Material: {product.material}</p>
            <p>Price: ₹{product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
