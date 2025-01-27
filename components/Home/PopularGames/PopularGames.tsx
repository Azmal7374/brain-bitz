/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
"use client"
import { Button } from "@heroui/button";
import { Card, CardFooter } from "@heroui/card";
import Image from "next/image";

const games = [
  {
    title: "Quizduell",
    image: "https://img.freepik.com/free-photo/wood-game-pieces-table_23-2147962732.jpg?ga=GA1.1.1302518135.1720608685&semt=ais_hybrid",
  },
  {
    title: "Buchstaben-Battle",
    image: "https://img.freepik.com/free-photo/letters-forming-word-discount_23-2147695511.jpg?ga=GA1.1.1302518135.1720608685&semt=ais_hybrid",
  },
  {
    title: "Stadt-Land-Fluss",
    image: "https://img.freepik.com/free-vector/set-scenes-nature-setting_1308-31606.jpg?ga=GA1.1.1302518135.1720608685&semt=ais_hybrid", 
  },
  {
    title: "Trivial Pursuit",
    image: "https://img.freepik.com/free-photo/close-up-bingo-game-elements_23-2149181825.jpg?ga=GA1.1.1302518135.1720608685&semt=ais_hybrid",
  },
  {
    title: "Pictionary",
    image: "https://img.freepik.com/free-vector/snake-ladder-game-template-with-farm-theme_1308-84580.jpg?ga=GA1.1.1302518135.1720608685&semt=ais_hybrid", 
  },
  {
    title: "Charades",
    image: "https://img.freepik.com/premium-vector/kids-sudoku-game-shapito-circus-clowns-jesters_8071-46406.jpg?ga=GA1.1.1302518135.1720608685&semt=ais_hybrid",
  },
];

export default function PopularGames() {
  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">Popular Games</h2>

        {/* Tailwind Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {games.map((game, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <Card isHoverable className="transition duration-300 hover:shadow-xl">
                {/* Game Image */}
                <div className="relative w-full h-48">
                  <Image
                    src={game.image}
                    layout="fill"
                    objectFit="cover"
                    alt={game.title}
                    className="rounded-lg transition duration-500 ease-in-out hover:scale-110"
                  />
                </div>

                {/* Game Title */}
                <CardFooter className="bg-white">
                  <h1 className="text-lg font-semibold text-center w-full text-black">
                    {game.title}
                  </h1>
                  {/* Interactive button */}
                  <Button
              color="success"
              className="hover:scale-105 transform transition"
            >
            Play Now
            </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
