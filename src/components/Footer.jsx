import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
const Footer = () => {
  return (
    <footer className="footer  text-white ">
      <div className="container text-center">
        <p className="mt-1">Follow us on social media:</p>
        <div className="social-icons ">
          <a href="https://www.facebook.com" className="text-white mx-3" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} />
          </a>
          <a href="https://twitter.com" className="text-white mx-3" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={30} />
          </a>
          <a href="https://www.instagram.com" className="text-white mx-3" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} />
          </a>
          <a href="https://www.linkedin.com" className="text-white mx-3" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={30} />
          </a>
        </div>
        <p className="mt-1">
          &copy; {new Date().getFullYear()} Movies. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
