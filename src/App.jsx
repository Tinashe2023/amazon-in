import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { InventoryProvider } from './context/InventoryContext'
import { SearchProvider } from './context/SearchContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ThankYouPage from './pages/ThankYouPage'
import ContactPage from './pages/ContactPage'
import './styles/global.css'

function App() {
    return (
        <Router>
            <SearchProvider>
                <CartProvider>
                    <InventoryProvider>
                        <Header />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/products" element={<ProductsPage />} />
                            <Route path="/thank-you" element={<ThankYouPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                        </Routes>
                        <Footer />
                    </InventoryProvider>
                </CartProvider>
            </SearchProvider>
        </Router>
    );
}

export default App
