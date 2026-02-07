import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Academic Disclaimer */}
                    <div className="disclaimer">
                        <p className="disclaimer-text">
                            ⚠️ <strong>Academic Disclaimer:</strong> This website is a non-commercial academic prototype
                            created solely for learning web analytics. No real transactions occur on this platform.
                        </p>
                    </div>

                    {/* Footer Links (Simulated) */}
                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Get to Know Us</h4>
                            <ul>
                                <li><a href="#about">About Us</a></li>
                                <li><a href="#careers">Careers</a></li>
                                <li><a href="#press">Press Releases</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Connect with Us</h4>
                            <ul>
                                <li><a href="#facebook">Facebook</a></li>
                                <li><a href="#twitter">Twitter</a></li>
                                <li><a href="#instagram">Instagram</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Let Us Help You</h4>
                            <ul>
                                <li><a href="#account">Your Account</a></li>
                                <li><a href="#returns">Returns Centre</a></li>
                                <li><a href="#help">Help</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="footer-bottom">
                        <p>&copy; 2026 Amazon India Demo. Educational Project for Web Analytics.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
