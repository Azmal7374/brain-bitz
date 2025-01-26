/* eslint-disable react/self-closing-comp */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
"use client"

import { Button } from "@heroui/button";

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-b from-green-200 to-white py-20">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center">
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
            Max out on fun learning with{" "}
            <span className="text-green-600">Brain Blitz</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600">
            Enjoy exciting playtime with premium ready-made games, new
            experiences, and custom characters. Play with friends, family, or by
            yourself against the community!
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Button
              color="success"
              className="hover:scale-105 transform transition"
            >
              See plans from $3.99/month
            </Button>
            <Button
              color="default"
            
              className="hover:scale-105 transform transition"
            >
              Sign up for free
            </Button>
          </div>
        </div>

        {/* Images */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center lg:justify-end relative">
          <div className="relative w-72 lg:w-96 h-auto rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
            <img
              src="https://img.freepik.com/premium-photo/child-learning-about-animals-using-interactive-educational-app-tablet-fun-education_416256-91746.jpg?ga=GA1.1.1302518135.1720608685&semt=ais_hybrid"
              alt="Tablet"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 lg:w-48 h-auto rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
            <img
              src="https://img.freepik.com/premium-photo/hands-young-gamer-boy-playing-video-games-smartphone-computer-dark-room-wearing-headphones-using-backlit-colorful-keyboard_171337-41746.jpg?ga=GA1.1.1302518135.1720608685&semt=ais_hybrid"
              alt="Phone"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <svg
        className="absolute bottom-0 left-0 w-full h-16 lg:h-32"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,256L48,240C96,224,192,192,288,170.7C384,149,480,139,576,160C672,181,768,235,864,250.7C960,267,1056,245,1152,208C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default Banner;
