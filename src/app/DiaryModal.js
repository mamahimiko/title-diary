import { RiImageAddFill } from "react-icons/ri";
import { useEffect } from "react";
import { useState } from "react";
import { getResponseForGivenPrompt } from "./Gemini";
import { nanoid } from "nanoid";
import Datepicker from "./Datepicker";

export default function DiaryModal() {
  const [inputValue, setInputValue] = useState({
    title: "",
    subtitle: "",
    date: "",
    name1: "",
    name2: "",
    name3: "",
    category: "",
    story: "",
  });
  const [story, setStory] = useState("");
  console.log(inputValue);

  const { title, subtitle, date, name1, name2, name3, category } = inputValue;

  const saveDiary = () => {
    const savedDiaries = JSON.parse(localStorage.getItem("diaries")) || [];
    const newDiary = { ...inputValue, id: nanoid() };
    const updatedDiaries = [...savedDiaries, newDiary];

    localStorage.setItem("diaries", JSON.stringify(updatedDiaries));

    alert("Diary saved successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const callGemini = async () => {
    console.log("Date value:", inputValue.date);

    if (!inputValue.title.trim()) {
      alert("Give me your a title!");
      return;
    }
    if (
      !inputValue.date ||
      typeof inputValue.date !== "string" ||
      !inputValue.date.trim()
    ) {
      alert("Put in the Date!");
      return;
    }
    const res = await getResponseForGivenPrompt(inputValue);
    setInputValue((prev) => ({ ...prev, story: res }));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-2/3 max-w-lg">
        <h1 className="text-center text-2xl font-bold mb-4">
          Give Today a Title!
        </h1>
        <div className="mb-4">
          <input
            type="text"
            id="title"
            name="title"
            value={title || ""}
            onChange={handleInputChange}
            placeholder="Additional title"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
        <h2 className="text-lg mb-2">Subtitle</h2>
        <div className="mb-4">
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={subtitle || ""}
            onChange={handleInputChange}
            placeholder="How was the day today?"
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
        <Datepicker
          onDateChange={(date) => {
            const formattedDate = date ? date.toISOString().split("T")[0] : "";
            console.log("Formatted Date:", formattedDate); // 🔍 デバッグ用
            setInputValue((prev) => ({ ...prev, date: formattedDate }));
          }}
        />
        <h2 className="text-lg mb-2">
          Are there any characters in your story?
        </h2>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            id="name1"
            name="name1"
            value={name1 || ""}
            onChange={handleInputChange}
            placeholder="Name..."
            className="w-1/3 p-2 border-gray-600 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            id="name2"
            name="name2"
            value={name2 || ""}
            onChange={handleInputChange}
            placeholder="Name..."
            className="w-1/3 p-2 border-gray-600 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            id="name3"
            name="name3"
            value={name3 || ""}
            onChange={handleInputChange}
            placeholder="Name..."
            className="w-1/3 p-2 border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-lg mb-2">How did you feel?</h2>

          <select
            name="category"
            value={category}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
          >
            <option value="Adventure">Adventure</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Romance">Romance</option>
            <option value="Horror">Horror</option>
            <option value="Suspense">Suspense</option>
            <option value="SF">SF</option>
          </select>
        </div>
        <div className="flex justify-around">
          <div>
            <RiImageAddFill className=" text-3xl mx-auto  text-gray-400 hover:text-white cursor-pointer" />
          </div>
          <div>
            <button
              onClick={callGemini}
              className="text-center  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Create your story!
            </button>
          </div>
        </div>
        <div className="py-9">
          <div
            className="border
        border-gray-600 bg-gray-700 rounded 
        p-9 w-full"
          >
            <div>
              <p>{inputValue.story || ""}</p>
            </div>
          </div>
          <div className="flex justify-center pt-5">
            <button
              onClick={saveDiary}
              className="text-center  bg-orange-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Save it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
