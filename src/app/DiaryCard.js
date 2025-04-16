import { PiNotePencilBold } from "react-icons/pi";
import Image from "next/image";
import DiaryModal from "./DiaryModal";
import { useState } from "react";
import { useEffect } from "react";
import { monthList } from "./monthData";

export default function Diary({ selectedMonth, selectedTodaysMonth }) {
  const [diaries, setDiaries] = useState([]);

  console.log("selectedTodaysMonth", selectedTodaysMonth);

  useEffect(() => {
    const savedDiaries = JSON.parse(localStorage.getItem("diaries")) || [];
    setDiaries(savedDiaries);
  }, []);

  const handleDelete = (id) => {
    const updatedDiaries = diaries.filter((diary) => diary.id !== id);
    setDiaries(updatedDiaries);
    localStorage.setItem("diaries", JSON.stringify(updatedDiaries));
  };

  const displayDate = (diary) => {
    if (!diary || !diary.date) return "";
    const onlyDate = diary.date ? diary.date.slice(8, 10) : "";

    console.log("diary:", diary);

    const dayNum = parseInt(onlyDate, 10);
    if (dayNum === 1 || dayNum === 21 || dayNum === 31) return dayNum + "st";
    if (dayNum === 2 || dayNum === 22) return dayNum + "nd";
    if (dayNum === 3 || dayNum === 23) return dayNum + "rd";
    return dayNum + "th";
  };

  const displayData = () => {
    if (!selectedMonth && !selectedTodaysMonth) return [];
    if (!diaries || diaries.length === 0) return [];

    const selectedData = selectedMonth || selectedTodaysMonth;
    const selectedMonthName = selectedData.name;
    const selectedYear = selectedData.year.toString();

    return diaries
      .filter((diary) => {
        if (!diary.date) return false;

        const diaryDate = new Date(diary.date);
        const diaryMonthName = diaryDate.toLocaleString("en-US", {
          month: "long",
        });
        const diaryYear = diaryDate.getFullYear().toString();

        return (
          diaryMonthName === selectedMonthName && diaryYear === selectedYear
        );
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // 日付順にソート
  };

  return (
    <>
      {displayData().map((diary, index) => (
        <div key={diary.id || `diary-${index}`}>
          <div className="flex justify-start p-4 border-b border-gray-500">
            <div className="flex items-center">
              <p className="font-bold">{displayDate(diary)}</p>
            </div>
            <div className="px-5">
              <Image
                src={`/${
                  selectedMonth?.imageId ||
                  selectedTodaysMonth?.imageId ||
                  "default.jpg"
                }`}
                alt={
                  selectedMonth?.name || selectedTodaysMonth?.name || "Default"
                }
                width={180}
                height={200}
                className="w-120 h-auto"
              />
            </div>

            <div className="flex flex-row flex-wrap w-2/3">
              <h2 className="text-lg font-bold">{diary.title}</h2>
              <div className="pl-3">
                <PiNotePencilBold />
              </div>
              <p className="py-2 w-full">{diary.story}</p>
            </div>
            <div className="flex">
              <div className="flex m-10 items-center justify-center">
                <div>{diary.category}</div>
              </div>
              <div className="flex justify-end items-start">
                <button
                  onClick={() => handleDelete(diary.id)}
                  className="text-white-500 hover:text-gray-300 text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
