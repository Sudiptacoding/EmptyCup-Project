"use client";
import { useState } from "react";
import { useShortlist } from "@/context/ShortlistContext";
import Image from "next/image";
import React from "react";
import Rating from "./Rating";

function Hero() {
  const { shortlist, removeFromShortlist } = useShortlist();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between py-8 p-4">
        <div className="flex items-center gap-6">
          <Image
            className="w-[34px] h-[42px]"
            src="/image/Group 6.png"
            alt="Logo"
            width={100}
            height={50}
          />
          <Image
            className="w-[27px] h-[40px]"
            src="/image/Group 7.png"
            alt="Logo"
            width={100}
            height={50}
          />
          <Image
            className="w-[17px] h-[40px] text-[#716966]"
            src="/image/Group 8.png"
            alt="Logo"
            width={100}
            height={50}
          />
        </div>
        <div className="flex items-center gap-6">
          <div className="relative w-[42px] h-[46px]">
            <Image
              onClick={() => setShowModal(true)}
              className="w-full h-full cursor-pointer"
              src="/image/Group 10.png"
              alt="Shortlist"
              width={42}
              height={46}
            />
            {shortlist?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {shortlist.length}
              </span>
            )}
          </div>
          <div className="w-[31px] h-[44px]">
            <Image
              className="w-full h-full"
              src="/image/Group 9.png"
              alt="Logo 2"
              width={31}
              height={44}
            />
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 max-w-[360] mx-auto h-full">
          <div className="bg-white rounded-xl p-4 w-full max-w-md relative shadow-xl">
            <h2 className="text-lg font-bold mb-4">Shortlisted Items</h2>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-gray-600 text-xl hover:text-black"
            >
              &times;
            </button>

            {shortlist.length === 0 ? (
              <p className="text-gray-500">No items in shortlist.</p>
            ) : (
              <div className="space-y-4 max-h-[80vh] overflow-y-auto no-scrollbar">
                {shortlist.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border rounded-lg shadow-md p-4 relative"
                  >
                    <h2 className="text-xl font-extrabold mb-2 text-black">
                      {item?.title || "Untitled"}
                    </h2>
                    {item?.rating && (
                      <div className="flex items-center text-yellow-500 mb-2">
                        <Rating
                          rating={item?.rating}
                          className="w-4 h-4 mr-1"
                        />
                      </div>
                    )}
                    <p className="mb-3 text-gray-700 text-sm">
                      {item?.description}
                    </p>
                    <div className="flex justify-between mb-4 items-center">
                      <span className="text-sm text-gray-600 text-center">
                        <span className="text-lg text-black font-extrabold">
                          {item?.products}
                        </span>
                        <br /> Products
                      </span>
                      <span className="text-sm text-gray-600 text-center">
                        <span className="text-lg text-black font-extrabold">
                          {item?.year}
                        </span>
                        <br /> Years
                      </span>
                      <span className="text-sm text-gray-600 text-center">
                        <span className="text-lg text-black font-extrabold">
                          {item?.price}
                        </span>
                        <br /> Price
                      </span>
                    </div>
                    {item?.phoneNumbers?.length > 0 && (
                      <div className="flex flex-col text-black text-sm mb-4">
                        {item.phoneNumbers.map((number, i) => (
                          <span key={i}>{number}</span>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={() => removeFromShortlist(item.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Hero;
