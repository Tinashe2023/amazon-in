import { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';
import { trackLowStock } from '../utils/analytics';

const InventoryContext = createContext();

export const useInventory = () => {
    const context = useContext(InventoryContext);
    if (!context) {
        throw new Error('useInventory must be used within InventoryProvider');
    }
    return context;
};

export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState(() => {
        // Initialize inventory from products data
        const initialInventory = {};
        products.forEach(product => {
            initialInventory[product.id] = product.initialStock;
        });
        return initialInventory;
    });

    const [lowStockTracked, setLowStockTracked] = useState(new Set());

    const getStock = (productId) => {
        return inventory[productId] || 0;
    };

    const decreaseStock = (productId) => {
        setInventory(prev => {
            const currentStock = prev[productId] || 0;
            if (currentStock > 0) {
                const newStock = currentStock - 1;

                // Track low stock event if stock becomes low (≤ 3) and hasn't been tracked yet
                if (newStock <= 3 && newStock > 0 && !lowStockTracked.has(productId)) {
                    const product = products.find(p => p.id === productId);
                    if (product) {
                        trackLowStock(product, newStock);
                        setLowStockTracked(prev => new Set(prev).add(productId));
                    }
                }

                return { ...prev, [productId]: newStock };
            }
            return prev;
        });
    };

    const isInStock = (productId) => {
        return getStock(productId) > 0;
    };

    const isLowStock = (productId) => {
        const stock = getStock(productId);
        return stock > 0 && stock <= 3;
    };

    const value = {
        inventory,
        getStock,
        decreaseStock,
        isInStock,
        isLowStock
    };

    return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
};
