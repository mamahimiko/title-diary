import Image from "next/image";
import { useEffect, useState } from "react";
import { getResponseForGivenPrompt } from "./Gemini";

export default function Mypage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Your Name");
  const [age, setAge] = useState("Age");
  const [character, setCharacter] = useState("Your Personality");
  const [uploadImage, setUploadImage] = useState("/user.png");

  useEffect(() => {
    const savedInfo = JSON.parse(localStorage.getItem("profileInfo"));
    const savedImage = localStorage.getItem("profileImage");
    if (savedInfo) {
      setName(savedInfo.name);
      setAge(savedInfo.age);
      setCharacter(savedInfo.character);
    }
    if (savedImage) {
      setUploadImage(savedImage);
    }
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const profileInfo = { name, age, character };
    localStorage.setItem("profileInfo", JSON.stringify(profileInfo));
    setIsEditing(false);
  };

  const handleProfileImageUpload = (e) => {
    const profileImage = e.target.files[0];
    if (!profileImage) return;

    if (!profileImage.type.startsWith("image/")) {
      alert("Select image file.");
      return;
    }

    if (profileImage.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadImage(reader.result);
      localStorage.setItem("profileImage", reader.result);
    };
    reader.readAsDataURL(profileImage);
  };

  return (
    <>
      <div className="text-white w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-2xl border border-gray-700 text-center w-96">
          <h2 className="text-3xl font-bold mb-4">Your Profile</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageUpload}
            id="profileImageUpload"
            hidden
          />
          <label
            htmlFor="profileImageUpload"
            className="cursor-pointer relative flex flex-col items-center"
          >
            <Image
              src={uploadImage}
              alt="profile"
              width={160}
              height={160}
              className="w-40 h-40 rounded-full border-4 border-gray-500 shadow-lg bg-gray relative"
            />

            <div className="absolute w-40 h-40 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <p className="text-white font-bold text-sm">Change picture</p>
            </div>
          </label>

          <div className="mt-6 bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-2xl border border-gray-700 text-center w-80">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 mb-2 border rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-2 mb-2 border rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  value={character}
                  onChange={(e) => setCharacter(e.target.value)}
                  className="w-full p-2 mb-2 border rounded bg-gray-700 text-white"
                />
                <button
                  onClick={handleSaveClick}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300"
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p className="text-2xl font-bold">{name}</p>
                <p className="text-lg text-gray-300">Age: {age}</p>
                <p className="text-lg text-gray-300">{character}</p>

                <button
                  onClick={handleEditProfile}
                  className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-300"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
