import React, { useState } from "react";

const Navbar = ({ onEduchampClick, onDashboardClick }) => {


  return (
    <nav className="bg-gray-900 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold" onClick={() => onEduchampClick()} >
            <button> Tales </button>
          </div>
          <div className="hidden lg:flex space-x-4" onClick={() => onDashboardClick()}>
            <a href="#" className="text-white">
              Dashboard
            </a>
            <div className=" grid justify-items-end h-[100%]">
              <img
                className=" w-[1.5rem] sm:w-[1.5rem] rounded-full"
                src="https://images.unsplash.com/photo-1532012197267-da84d127e765?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D"
              />
            </div>
          </div>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;
