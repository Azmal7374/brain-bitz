/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const HowItWorks = () => {
  const rules = [
    {
      title: "Craft Your Culinary Identity",
      description:
        "Begin by creating your personalized cooking profile. Introduce yourself, highlight your favorite cuisines, and engage with a passionate community of food lovers.",
    },
    {
      title: "Discover & Share Culinary Delights",
      description:
        "Explore an extensive collection of global recipes, or share your culinary masterpieces with detailed ingredients, images, and step-by-step instructions.",
    },
    {
      title: "Connect & Inspire",
      description:
        "Follow your favorite chefs and home cooks to stay inspired by their latest creations. Build meaningful connections and enrich your culinary journey through shared experiences.",
    },
    {
      title: "Engage, Appreciate, & Elevate",
      description:
        "Share your thoughts by rating, commenting, and upvoting recipes you love. Be a part of the conversation and elevate the community with your valuable feedback.",
    },
    {
      title: "Brain Bitz: The Ultimate Flavor Challenge",
      description:
        "Join the 'Brain Bitz' challenge, where you can test your culinary knowledge in real-time trivia games. Unlock exclusive ingredients, rewards, and badges as you level up in the community.",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div>
      <div className="mt-24 pb-20">
        <div className="mb-4 flex items-center justify-center gap-8 sm:mb-8 md:mb-5">
          <div className="flex items-center justify-center gap-12" ref={ref}>
            <motion.h2
              className="!text-5xl font-bold text-default-900 lg:text-4xl"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              How It <span className="text-green-600">Works</span>
            </motion.h2>
          </div>
        </div>

        <div ref={ref} className="p-4 max-w-xl mx-auto mt-10">
          {rules.map((step, index) => (
            <motion.div
              key={index}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              className="flex mb-6"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="mr-4 flex flex-col items-center">
                <motion.div whileHover={{ scale: 1.2 }}>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-600">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 5l0 14" />
                      <path d="M18 13l-6 6" />
                      <path d="M6 13l6 6" />
                    </svg>
                  </div>
                </motion.div>
                <div className="h-full w-px bg-green-600" />
              </div>

              <div className="pt-1 pb-8">
                <p className="mb-2 text-2xl font-bold text-default-900">
                  {step.title}
                </p>
                <motion.p
                  className="text-gray-700 text-lg"
                  whileHover={{ color: "#16a34a" }}
                  transition={{ duration: 0.3 }}
                >
                  {step.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
          <motion.div
            className="flex"
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: rules.length * 0.6 }}
          >
            <div className="mr-4 flex flex-col items-center">
              <motion.div whileHover={{ scale: 1.2 }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-green-600 bg-green-600">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
              </motion.div>
            </div>
            <div className="pt-1">
              <p className="mb-2 text-xl font-bold text-default-900">
                And you're all set to join the community!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
