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
    image: "",
  });
  const [story, setStory] = useState("");

  const { title, subtitle, date, name1, name2, name3, category } = inputValue;

  const saveDiary = () => {
    if (!inputValue.story) {
      alert("Story saved! 📖✨");
      return;
    }

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.starstWith("image/")) {
      alert("Select image file.");
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2MB");
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputValue((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const callGemini = async () => {
    if (!inputValue.title.trim()) {
      alert("Give your story a title!");
      return;
    }
    if (
      !inputValue.date ||
      typeof inputValue.date !== "string" ||
      !inputValue.date.trim()
    ) {
      alert("Don’t forget to add the date!");
      return;
    }
    const res = await getResponseForGivenPrompt(inputValue);
    setInputValue((prev) => ({ ...prev, story: res }));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-2/3 max-w-lg">
        <h1 className="text-center text-2xl font-bold mb-4">Title your day!</h1>
        <div className="mb-4">
          <input
            type="text"
            id="title"
            name="title"
            value={title || ""}
            onChange={handleInputChange}
            placeholder="Main title"
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
            setInputValue((prev) => ({ ...prev, date: formattedDate }));
          }}
        />
        <h2 className="text-lg mb-2">Any characters in your story?</h2>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            id="name1"
            name="name1"
            value={name1 || ""}
            onChange={handleInputChange}
            placeholder="Enter a name"
            className="w-1/3 p-2 border-gray-600 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            id="name2"
            name="name2"
            value={name2 || ""}
            onChange={handleInputChange}
            placeholder="Enter a name"
            className="w-1/3 p-2 border-gray-600 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            id="name3"
            name="name3"
            value={name3 || ""}
            onChange={handleInputChange}
            placeholder="Enter a name"
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
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="imageUpload"
            hidden
          />

          <label htmlFor="imageUpload">
            <RiImageAddFill className="text-3xl mx-auto  text-gray-400 hover:text-white cursor-pointer" />
          </label>
        </div>

        {inputValue.image && (
          <div className="flex justify-center">
            <img
              src={inputValue.image}
              alt="Uploaded"
              className="w-40 h-40 object-cover rounded"
            />
          </div>
        )}

        <div>
          <button
            onClick={callGemini}
            className="text-center  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Create your story!
          </button>
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
              Save your diary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
