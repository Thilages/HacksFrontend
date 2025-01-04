import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <div className="bg-[#181a1b] text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400">Feel free to reach out to us for any questions or support.</p>
            <ul className="text-gray-400 mt-4">
              <li>Email: support@event.com</li>
              <li>Phone: +123 456 7890</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#54ea54]">
                <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#54ea54]">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#54ea54]">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#54ea54]">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates and event news.</p>
            {/* <form className="flex max-sm:w-[100px] ">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-lg  text-gray-900"
              />
              <button
                type="submit"
                className="bg-[#54ea54] px-4 py-2 rounded-r-lg text-white hover:bg-[#45d145]"
              >
                Subscribe
              </button>
            </form> */}
          </div>

        </div>

        <div className="text-center mt-10 text-gray-400">
          <p>&copy; {new Date().getFullYear()} Event Name. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
