import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero carousel images
  const heroImages = [
    '/images/Iphone 15 Pro.jpg',
    '/images/Samsung Galaxy s25 ultra.jpg',
    '/images/macbook(2023).jpg',
    '/images/Sony Camera.jpg',
    '/images/Samsung smart tv.jpg'
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home-page">
      {/* Hero Carousel Section */}
      <section className="hero-carousel">
        <div className="carousel-container">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img
                src={image}
                alt={`Hero ${index + 1}`}
                className="carousel-image"
              />
              <div className="carousel-overlay">
                <div className="container">
                  <div className="hero-content">
                    <h1 className="hero-title">
                      Amazon India – Shopping Experience
                      <span className="demo-badge">(Demo)</span>
                    </h1>
                    <p className="hero-subtitle">
                      An academic prototype for demonstrating Google Analytics GA4 tracking
                    </p>
                    <Link to="/products" className="btn btn-primary btn-lg hero-cta">
                      Browse Products
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="disclaimer-banner">
        <div className="container">
          <p>
            ⚠️ This is a non-commercial academic website created solely for learning web analytics.
            No real payments or transactions occur on this platform.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Demo Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <h3>Shopping Cart</h3>
              <p>Fully functional cart with add/remove items and quantity management</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3>Stock Simulation</h3>
              <p>Dynamic inventory with scarcity messaging and low stock alerts</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
              </div>
              <h3>Payment Gateway</h3>
              <p>Simulated checkout with card, UPI, and net banking options</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h3>GA4 Analytics</h3>
              <p>Event tracking for add_to_cart, purchase_intent, and form submissions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <Link to="/products" className="category-card">
              <img src="/images/Iphone 15 Pro.jpg" alt="Electronics" className="category-image" />
              <h3>Electronics</h3>
            </Link>
            <Link to="/products" className="category-card">
              <img src="/images/Nike airforce.jpg" alt="Fashion" className="category-image" />
              <h3>Fashion</h3>
            </Link>
            <Link to="/products" className="category-card">
              <img src="/images/Office Chair.jpg" alt="Home & Furniture" className="category-image" />
              <h3>Home & Furniture</h3>
            </Link>
            <Link to="/products" className="category-card">
              <img src="/images/Yamaha Piano.jpg" alt="Musical Instruments" className="category-image" />
              <h3>Musical Instruments</h3>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
