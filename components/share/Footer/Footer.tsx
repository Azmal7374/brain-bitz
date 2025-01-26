/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
"use client"
import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-gray-400 transition duration-200">Home</a></li>
              <li><a href="#about" className="hover:text-gray-400 transition duration-200">About Us</a></li>
              <li><a href="#services" className="hover:text-gray-400 transition duration-200">Services</a></li>
              <li><a href="#contact" className="hover:text-gray-400 transition duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 rounded-l-md text-black"
                required
              />
              <button type="submit" className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700 transition duration-200">
                Subscribe
              </button>
            </form>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center text-sm text-gray-400">
          <p>&copy; 2025 Brain Blitz . All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
