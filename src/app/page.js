"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { monthList } from "./monthData";
import Modal from "./Modal";
import Calendar from "./Calender";
import { PiNotePencilBold } from "react-icons/pi";
import DiaryModal from "./DiaryModal";
import dayjs from "dayjs";
import { Poppins } from "next/font/google";

const now = dayjs();
const today = now.format("YYYY-MM-DD");
const thisYear = now.format("YYYY");
const titleMonth = now.format("MMMM");
const titleDay = now.format("D");

const formatDayWithSuffix = (day) => {
  const dayNum = parseInt(day, 10);
  if (dayNum === 1 || dayNum === 21 || dayNum === 31) return dayNum + "st";
  if (dayNum === 2 || dayNum === 22) return dayNum + "nd";
  if (dayNum === 3 || dayNum === 23) return dayNum + "rd";
  return dayNum + "th";
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: "normal",
  variable: "--font-poppins",
});

function Header() {
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-auto px-8 flex items-center  justify-between transition-all duration-300 z-50 ${
        isScrolled ? "bg-black bg-opacity-90 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="text-red-500 text-3xl py-5">LIFE like A DRAMA!</div>
      <div
        className={`flex items-center space-x-6 text-white ml-auto ${
          isScrolled ? "text-white" : "text-black"
        }`}
      >
        <div>My Page</div>
      </div>
    </header>
  );
}

function Carousel({ year }) {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [emblaRef] = useEmblaCarousel();

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const filteredMonths = monthList.filter(
    (month) => Number(month.year) === year
  );

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <Modal
        isOpen={activeModal === "calendar"}
        handleCloseModal={() => setActiveModal(null)}
        title="Calendar"
      >
        <Calendar selectedMonth={selectedMonth} />
      </Modal>
      <div className="flex gap-x-4">
        {filteredMonths.map((month) => (
          <div key={month.id} className="relative min-w-[300px] aspect-[3/2]">
            <Image
              onClick={() => {
                setSelectedMonth(month);
                setActiveModal("calendar");
              }}
              className="w-full h-full object-cover rounded-lg"
              src={`/${month.imageId}`}
              alt={month.name}
              width={300}
              height={200}
            />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded">
              <h2 className="text-white text-lg font-bold">{month.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home({ year }) {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedTodaysMonth, setSelectedTodaysMonth] = useState(null);
  const [bgImage, setBgImage] = useState("");
  const [titleDay, setTitleDay] = useState("");

  useEffect(() => {
    setBgImage(`/${titleMonth}.jpg`);
    setTitleDay(now.format("D"));
  }, [titleMonth]);

  const filteredMonths = monthList.filter(
    (month) => Number(month.year) === year
  );

  const todaysMonth = monthList.find(
    (month) => month.year === thisYear && month.name === titleMonth
  );
  console.log("todaysMonth: ", todaysMonth);

  const handleCloseModal = () => {
    setActiveModal(false);
  };

  return (
    <>
      <Header />
      <main>
        <div
          className="relative h-[60vh] bg-cover bg-center flex flex-col items-start justify-center pl-10"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-b from-transparent to-black"></div>
          <div
            className={`${poppins.className} text-9xl text-pink-600 pt-48  font-poppins`}
          >
            {titleMonth} {formatDayWithSuffix(titleDay)}
          </div>
          <div className="flex">
            <Modal
              isOpen={activeModal === "calendar"}
              handleCloseModal={() => setActiveModal(null)}
              title="Calendar"
            >
              <Calendar selectedTodaysMonth={selectedTodaysMonth} />
            </Modal>
            <button
              onClick={() => {
                setSelectedTodaysMonth(todaysMonth);
                setActiveModal("calendar");
              }}
              className="mt-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xl"
            >
              Open Your Diary
            </button>

            <div className="px-3">
              <Modal
                isOpen={activeModal === "diary"}
                handleCloseModal={() => setActiveModal(null)}
                title="Diary"
              >
                <DiaryModal />
              </Modal>

              <button
                onClick={() => setActiveModal("diary")}
                className="mt-4 bg-white hover:bg-gray-100 py-2 px-4 border border-gray-400 rounded shadow text-3xl"
              >
                <PiNotePencilBold />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-black p-8">
          <h2 className="pt-8 pb-2 font-bold text-2xl text-white">
            2025 Calendar
          </h2>
          <Carousel year={2025} />

          <h2 className="pt-8 pb-2 font-bold text-2xl text-white">
            2024 Calendar
          </h2>
          <Carousel year={2024} />
        </div>
      </main>
    </>
  );
}
