// Analytics utility functions for GA4 event tracking

export const trackAddToCart = (product, quantity = 1) => {
    if (window.gtag) {
        window.gtag('event', 'add_to_cart', {
            currency: 'INR',
            value: product.price * quantity,
            items: [{
                item_id: product.id,
                item_name: product.name,
                item_category: product.category,
                price: product.price,
                quantity: quantity
            }]
        });
    }
};

export const trackPurchaseIntent = (cartItems, total) => {
    if (window.gtag) {
        window.gtag('event', 'purchase_intent', {
            currency: 'INR',
            value: total,
            items: cartItems.map(item => ({
                item_id: item.id,
                item_name: item.name,
                item_category: item.category,
                price: item.price,
                quantity: item.quantity
            }))
        });
    }
};

export const trackFormSubmit = (formType) => {
    if (window.gtag) {
        window.gtag('event', 'form_submit', {
            form_type: formType,
            form_location: window.location.pathname
        });
    }
};

export const trackLowStock = (product, stockRemaining) => {
    if (window.gtag) {
        window.gtag('event', 'low_stock_view', {
            item_id: product.id,
            item_name: product.name,
            stock_remaining: stockRemaining,
            item_category: product.category
        });
    }
};
