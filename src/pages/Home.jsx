import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
    const handleStart = () => {
    navigate("/products");
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-100 to-white px-4 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-green-700 flex items-center gap-2 animate-pulse">
        <span className="px-4 py-2">Shopyy</span>
        <span className="text-3xl sm:text-4xl animate-bounce">🛒</span>
      </h1>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 animate-fade-in">
        Get Anything Delivered in <span className="text-green-600 font-bold">10 Minutes</span> 🕒
      </h2>
      <button
        onClick={handleStart}
        className="mt-8 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300 animate-fade-in"
      >
        Start Shopping 🚀
      </button>
    </div>
  );
};

export default Home;
