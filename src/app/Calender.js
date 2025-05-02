"use client";
import Image from "next/image";
import Diary from "./DiaryCard";
import { monthList } from "./monthData";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: "normal",
  variable: "--font-poppins",
});

export default function Calendar({ selectedMonth, selectedTodaysMonth }) {
  const season = selectedMonth || {};

  return (
    <div className="text-white relative w-full h-screen flex flex-col">
      <div className="relative w-full h-1/2 flex-shrink-0">
        <Image
          src={
            selectedMonth?.imageId
              ? `/${selectedMonth.imageId}`
              : selectedTodaysMonth?.imageId
              ? `/${selectedTodaysMonth.imageId}`
              : "/default.jpg"
          }
          alt={
            selectedMonth?.name
              ? `${selectedMonth.name} calendar`
              : selectedTodaysMonth?.name
              ? `${selectedTodaysMonth.name} calendar`
              : "Default Calendar"
          }
          fill
          className="absolute w-full h-full object-cover"
        />
        <div className="pl-10 absolute inset-0 flex items-center z-10">
          <h2 className={`${poppins.className} text-9xl text-pink-600 pt-48`}>
            {selectedMonth?.name || selectedTodaysMonth?.name || "Calendar"}
          </h2>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black"></div>
      </div>
      <div className="p-6">
        <div>
          <h2 className="font-bold">Episodes</h2>
          <div>
            <h3>Season : {season.year || new Date().getFullYear()}</h3>
            <Diary
              selectedMonth={selectedMonth}
              selectedTodaysMonth={selectedTodaysMonth}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
