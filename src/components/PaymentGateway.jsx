import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { trackPurchaseIntent } from '../utils/analytics';
import './PaymentGateway.css';

const PaymentGateway = ({ onClose, total }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Track purchase intent event
        trackPurchaseIntent(cartItems, total);

        // Simulate payment processing
        setTimeout(() => {
            // Navigate with cart data BEFORE clearing
            navigate('/thank-you', {
                state: {
                    cartItems: [...cartItems],
                    total: total
                }
            });
            clearCart();
            onClose();
        }, 2000);
    };

    return (
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className="payment-modal">
                <div className="payment-header">
                    <h2>Payment Gateway</h2>
                    <button className="close-btn" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="payment-body">


                    <form onSubmit={handlePlaceOrder}>
                        {/* Payment Method Selection */}
                        <div className="payment-methods">
                            <label className="payment-method-option">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span>Credit/Debit Card</span>
                            </label>
                            <label className="payment-method-option">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="upi"
                                    checked={paymentMethod === 'upi'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span>UPI</span>
                            </label>
                            <label className="payment-method-option">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="netbanking"
                                    checked={paymentMethod === 'netbanking'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span>Net Banking</span>
                            </label>
                        </div>

                        {/* Card Payment Form */}
                        {paymentMethod === 'card' && (
                            <div className="payment-form">
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Expiry Date</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>CVV</label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            maxLength="3"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Cardholder Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* UPI Payment */}
                        {paymentMethod === 'upi' && (
                            <div className="payment-form">
                                <div className="form-group">
                                    <label>UPI ID</label>
                                    <input
                                        type="text"
                                        placeholder="yourname@upi"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Net Banking */}
                        {paymentMethod === 'netbanking' && (
                            <div className="payment-form">
                                <div className="form-group">
                                    <label>Select Bank</label>
                                    <select required>
                                        <option value="">Choose your bank</option>
                                        <option value="sbi">State Bank of India</option>
                                        <option value="hdfc">HDFC Bank</option>
                                        <option value="icici">ICICI Bank</option>
                                        <option value="axis">Axis Bank</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Order Summary */}
                        <div className="order-summary">
                            <h3>Order Summary</h3>
                            <div className="summary-row">
                                <span>Items ({cartItems.length})</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Delivery</span>
                                <span className="free">FREE</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total Amount</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <div className="spinner"></div>
                                    Processing...
                                </>
                            ) : (
                                'Place Order'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PaymentGateway;
