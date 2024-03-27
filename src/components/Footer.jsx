import React from 'react';
import './footer.css'; // Import your CSS file for styling
import '@fortawesome/fontawesome-free/css/all.css';
const Footer = () => {
    return (
      <footer className="footer">
        <div className="footer__content">
          <div className="footer__section">
            <h2>About Us</h2>
            <p>Get you guide Enjoy your Trip.</p>
          </div>
          <div className="footer__section">
            <h2>Contact Us</h2>
            <p>Email: projectplazapro@gmail.com</p>
            <p>Phone: +1234567890</p>
            <p>Address: 123 Main Street, City, Country</p>
          </div>
          <div className="footer__section">
            <h2>Follow Us</h2>
            <p>Connect with us on social media:</p>
            <div className="footer__social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
          <div className="footer__section">
            <h2>Useful Links</h2>
            <ul>
              <li><a href="#">Terms and Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__copyright">
          <p>&copy; {new Date().getFullYear()} Tour Guide Website. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;