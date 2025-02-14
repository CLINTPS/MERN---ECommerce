import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen w-f flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-black">
      <h1 className="text-5xl font-bold mb-8 text-center">Welcome to E-Commerce</h1>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
        <Link
          to="/products"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md hover:bg-blue-700 transition"
        >
          Browse Products
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-gray-700 text-white rounded-lg text-lg shadow-md hover:bg-gray-800 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
