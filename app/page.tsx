import React from "react";

export default function Home() {
return (
    <div className="flex items-center justify-center min-h-screen bg-wight-200">
    <div className="relative w-[350px] h-[150px] bg-green-500 text-white text-center">
        
        <h1 className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 bg-cyan-100 text-black px-3 py-1 text-lg border border-black">
        Banner
        </h1>

        <button className="absolute top-0 right-0 bg-gray-200 text-black px-1 border border-black text-xs rounded-sm">
        x
        </button>

        <div className="absolute left-[-30px] top-[30%] w-[60px] h-[60px] bg-white rounded-full"></div>

        <div className="absolute right-[-25px] bottom-[-25px] w-[90px] h-[55px] bg-white rounded-t-[40px] rounded-l-[30px]"></div>

        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 py-2 text-lg border border-dotted border-white">
        This is css position
        </span>
    </div>
    </div>
);
}