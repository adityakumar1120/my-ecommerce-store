import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Linkedin, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Exclusive</h3>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Subscribe</h4>
              <p className="text-sm text-gray-300 mb-2">Get 10% off your first order</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 text-white px-4 py-2 text-sm rounded-l-md focus:outline-none w-full"
                />
                <button className="bg-gray-800 px-3 rounded-r-md border-l border-gray-700">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <address className="not-italic text-sm text-gray-300 mb-2">
              111 Bijoy sarani, Dhaka,<br />
              DH 1515, Bangladesh.
            </address>
            <p className="text-sm text-gray-300 mb-1">exclusive@gmail.com</p>
            <p className="text-sm text-gray-300 mb-4">+88015-88888-9999</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Account</h3>
            <nav className="flex flex-col space-y-2 text-sm text-gray-300">
              <Link to="/" className="hover:text-white transition-colors">My Account</Link>
              <Link to="/login" className="hover:text-white transition-colors">Login / Register</Link>
              <Link to="/cart" className="hover:text-white transition-colors">Cart</Link>
              <Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link>
              <Link to="/" className="hover:text-white transition-colors">Shop</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Link</h3>
            <nav className="flex flex-col space-y-2 text-sm text-gray-300">
              <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/" className="hover:text-white transition-colors">Terms Of Use</Link>
              <Link to="/" className="hover:text-white transition-colors">FAQ</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </nav>
            
            
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© Copyright Rimel 2022. All right reserved</p>
        </div>
        
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;