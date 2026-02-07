import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import './Header.css';

const Header = () => {
    const { getCartItemCount, setIsCartOpen } = useCart();
    const { searchQuery, setSearchQuery } = useSearch();
    const navigate = useNavigate();
    const cartCount = getCartItemCount();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Navigate to products page when searching
        navigate('/products');
    };

    return (
        <header className="header">
            <div className="header-top">
                <div className="container">
                    <div className="header-content">
                        {/* Logo */}
                        <Link to="/" className="logo">
                            <span className="logo-amazon">amazon</span>
                            <span className="logo-in">.in</span>
                        </Link>

                        {/* Search Bar */}
                        <form className="search-bar" onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                placeholder="Search for products, brands and more"
                                className="search-input"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <button type="submit" className="search-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.35-4.35" />
                                </svg>
                            </button>
                        </form>

                        {/* Cart Icon */}
                        <button
                            className="cart-button"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 2L7.17 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-4.17L15 2H9z" />
                                <circle cx="12" cy="13" r="3" />
                            </svg>
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                            <span className="cart-text">Cart</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="header-nav">
                <div className="container">
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
