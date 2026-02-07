import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useInventory } from '../context/InventoryContext';
import { trackAddToCart } from '../utils/analytics';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart, setIsCartOpen } = useCart();
    const { getStock, decreaseStock, isInStock, isLowStock } = useInventory();
    const [isAdding, setIsAdding] = useState(false);

    const stock = getStock(product.id);
    const inStock = isInStock(product.id);
    const lowStock = isLowStock(product.id);

    const handleAddToCart = () => {
        if (!inStock) return;

        setIsAdding(true);
        addToCart(product);
        decreaseStock(product.id);
        trackAddToCart(product);

        setTimeout(() => setIsAdding(false), 500);
    };

    const handleBuyNow = () => {
        if (!inStock) return;

        addToCart(product);
        decreaseStock(product.id);
        trackAddToCart(product);
        // Open cart drawer so user can proceed to checkout
        setIsCartOpen(true);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />

                {/* Stock Badge */}
                {!inStock && (
                    <span className="stock-badge badge-danger">Out of Stock</span>
                )}
                {inStock && lowStock && (
                    <span className="stock-badge badge-warning">Only {stock} left!</span>
                )}
                {inStock && !lowStock && (
                    <span className="stock-badge badge-success">In Stock</span>
                )}
            </div>

            <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-footer">
                    <p className="product-price">{formatPrice(product.price)}</p>

                    <div className="product-actions">
                        <button
                            className={`btn btn-primary btn-sm ${isAdding ? 'adding' : ''}`}
                            onClick={handleAddToCart}
                            disabled={!inStock || isAdding}
                        >
                            {isAdding ? 'Adding...' : 'Add to Cart'}
                        </button>
                        <button
                            className="btn btn-secondary btn-sm"
                            onClick={handleBuyNow}
                            disabled={!inStock}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
