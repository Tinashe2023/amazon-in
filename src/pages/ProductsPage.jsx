import { useMemo, useEffect } from 'react';
import { products } from '../data/products';
import { useSearch } from '../context/SearchContext';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';
import { trackSearch } from '../utils/analytics';
import './ProductsPage.css';

const ProductsPage = () => {
    const { searchQuery, setSearchQuery } = useSearch();

    // Filter products based on search query
    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) {
            return products;
        }

        const query = searchQuery.toLowerCase();
        return products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    // Track search events
    useEffect(() => {
        if (searchQuery.trim()) {
            trackSearch(searchQuery, filteredProducts.length);
        }
    }, [searchQuery, filteredProducts.length]);

    return (
        <div className="products-page">
            <div className="container">
                <div className="products-header">
                    <h1>All Products</h1>
                    {searchQuery && (
                        <div className="search-info">
                            <p>
                                Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"
                            </p>
                            <button
                                className="btn btn-outline btn-sm"
                                onClick={() => setSearchQuery('')}
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                    {!searchQuery && <p>Browse our collection of premium products</p>}
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="products-grid">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <h2>No products found</h2>
                        <p>Try searching with different keywords</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => setSearchQuery('')}
                        >
                            View All Products
                        </button>
                    </div>
                )}
            </div>

            <ShoppingCart />
        </div>
    );
};

export default ProductsPage;
