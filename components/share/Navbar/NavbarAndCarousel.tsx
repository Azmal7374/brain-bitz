/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable prettier/prettier */
import Link from "next/link";
import { useState } from "react";
import Marquee from "react-fast-marquee";

const NavbarAndCarousel = () => {
  const [selectedTab, setSelectedTab] = useState("For all");

  const tabs = ["For all", "At work", "At school", "At home"];
  const carouselItems = [
    {
      title: "Women in Leadership",
      mode: "Classic mode",
      color: "bg-purple-500",
      link: "/leadership",
      img:"https://kahoot.com/files/2023/10/Quicklaunch-solar-system.png",
    },
    { title: "Goal Setting", mode: "Classic mode", color: "bg-red-500", link: "/goals",img:"https://kahoot.com/files/2024/04/Marvel-quiz-13.png" },
    {
      title: "Minimizing Time Wasters",
      mode: "Classic mode",
      color: "bg-blue-500",
      link: "/time-wasters",
      img:"https://kahoot.com/files/2023/10/Quicklaunch-solar-system.png"
    },
    {
      title: "Nobel Peace Prize 2024",
      mode: "Classic mode",
      color: "bg-yellow-500",
      link: "/nobel-prize",
      img:"https://kahoot.com/files/2023/10/Star-Wars-Quicklaunch-toolbar5.png"
    },
    {
      title: "Tips and Tricks for Working From Home",
      mode: "Self-study",
      color: "bg-green-500",
      link: "/work-from-home",
      img:"https://kahoot.com/files/2023/10/Quicklaunch-whats-that-landmark.png"
    },
    {
      title: "Festive Film Challenge",
      mode: "Classic mode",
      color: "bg-gray-500",
      link: "/film-challenge",
      img:"https://kahoot.com/files/2023/10/Quicklaunch-disney-quiz.png"
    },
  ];

  return (
    <div className="bg-white hidden lg:block  text-black p-4 border rounded-lg">
      {/* Navbar */}
      <div className="bg-blue-600 flex flex-wrap lg:flex-nowrap items-center p-4 gap-4">
        {/* Logo and Tabs */}
        <div className="flex flex-col lg:flex-row items-center lg:w-1/3 gap-4 ">
          {/* Logo */}
          <div className="text-center lg:text-left">
            <h1 className="font-bold text-2xl text-white">Brain Blitz!</h1>
            <span className="text- px-2 py-1 bg-white rounded">GO!</span>
            {/* <p className="text-sm text-white">Free 20-minute sessions</p> */}
          </div>
          {/* Tabs */}
          <div className="flex flex-row lg:flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`text-sm px-3 py-1 rounded ${
                  selectedTab === tab ? "bg-blue-700 text-white" : "text-blue-200"
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Middle: Carousel */}
        <Marquee className="" direction="left" speed={30}>
        <div className="flex-1 overflow-hidden relative ">
          <div className="flex space-x-4">
            {carouselItems.map((item, index) => (
              <Link key={index} href={item.link} passHref>
              
              <div
  className={`w-40 h-20 flex-shrink-0 flex flex-col items-center justify-center rounded-lg text-center cursor-pointer transform hover:scale-105 transition-transform relative`}
  style={{
    backgroundImage: `url(${item.img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="bg-black/50 w-full h-full absolute inset-0 rounded-lg"></div>
  <div className="z-10">
    <h2 className="text-[12px] font-bold text-white">{item.title}</h2>
    <p className="text-[10px] text-gray-100">{item.mode}</p>
  </div>
</div>


              </Link>
            ))}
          </div>
        </div>
            </Marquee>

        {/* Fixed Buttons */}
        <div className="flex flex-row  gap-4 lg:w-1/3 ">
          <Link href="/quiz">
          <div className="w-[200px] h-20 flex flex-col items-center justify-center rounded-2xl bg-white text-center text-black cursor-pointer transform hover:scale-105 transition-transform">
            <img className="w-[40px] mx-auto" src="https://kahoot.com/wp-content/themes/kahoot2017/assets/img/create_icon.png" alt="join" />
              <h2 className="text-[14px] font-bold">Create a Brain Blitz!</h2>
          </div>
            </Link>
            <Link href="/german-games">
          <div className="w-[200px] h-20 flex flex-col items-center justify-center rounded-2xl bg-white text-center text-black cursor-pointer transform hover:scale-105 transition-transform">
            <img className="w-[40px] mx-auto" src="https://kahoot.com/wp-content/themes/kahoot2017/assets/img/enter_pin_logo.png" alt="join" />
              <h2 className="text-[14px] font-bold">Join game</h2>
          </div>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarAndCarousel;