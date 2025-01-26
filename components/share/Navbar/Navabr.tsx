/* eslint-disable import/order */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import Link from "next/link";
import NavbarAndCarousel from "./NavbarAndCarousel";

const Navbar = () => {
  return (
    <>
      <NavbarAndCarousel />
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between py-2">
          {/* Logo */}
          <div className="flex items-center space-x-2">
           <Link href="/">
           <span className="text-blue-600 font-bold text-xl">
              Brain Blitz!
            </span>
           </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <button className="relative text-sm font-medium">
              News
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1 rounded-full">
                3
              </span>
            </button>
            {["Work", "School", "Higher Education", "Study", "Quiz"].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}  // Adjusted to dynamically route based on link name
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-sm font-medium text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-600 hover:text-white"
            >
              Contact sales
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Play
            </Link>
            <button className="bg-green-600 text-white text-sm font-medium px-4 py-1 rounded hover:bg-green-700">
              Sign up FREE
            </button>
            <Link
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Log in
            </Link>
            <div className="flex items-center space-x-1 border border-gray-300 px-2 py-1 rounded">
              <span className="text-sm">🌐</span>
              <span className="text-sm">EN</span>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="block md:hidden mt-4 w-full">
            <div className="flex flex-col space-y-2">
              <button className="relative text-sm font-medium">
                News
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1 rounded-full">
                  3
                </span>
              </button>
              {["Work", "School", "Higher Education", "Home", "Study", "Discover"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
