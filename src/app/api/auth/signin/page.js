"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signIn("google");
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="p-8 bg-gray-100 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          Who's Title Diary? :)
        </h2>
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          {loading ? "Loading..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
