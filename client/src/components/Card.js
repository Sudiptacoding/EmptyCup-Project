"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  BsArrowRight,
  BsBookmarkHeart,
  BsBookmarkHeartFill,
} from "react-icons/bs";
import { FaRegEyeSlash } from "react-icons/fa6";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Rating from "./Rating";
import { useShortlist } from "@/context/ShortlistContext";
import Link from "next/link";
import { toast } from "react-toastify";

function Card() {
  const [data, setData] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const { shortlist, addToShortlist } = useShortlist();

  useEffect(() => {
    axios
      .get("https://emptycup-project-1.onrender.com/tech")
      .then((res) => {
        setData(res.data);
        setVisibleCards(Array(res.data.length).fill(true));
      })
      .catch((err) => console.error("Axios error:", err));
  }, []);

  const handleHide = (index) => {
    const hideValue = data?.find((i) => i.id == index);
    toast(`${hideValue?.title} is Now Hide`);
    const updatedVisibility = [...visibleCards];
    updatedVisibility[index] = false;
    setVisibleCards(updatedVisibility);
  };

  return (
    <div className="space-y-4">
      {data?.map((item, index) => {
        if (!visibleCards[index]) return null;
        const isShortlisted = shortlist.some((i) => i.id === item.id);
        return (
          <div
            key={index}
            className="flex px-4 py-3"
            style={{ background: index % 2 === 0 ? "#FFFCF2" : "#ffffff" }}
          >
            <div className="w-4/5 pr-6 border-r">
              <h2 className="text-xl font-extrabold mb-3 text-black">
                {item?.title}
              </h2>
              <div className="flex items-center text-yellow-500 mb-2">
                <Rating rating={item?.rating} className="w-4 h-4 mr-1" />
              </div>
              <p className="mb-2 text-gray-700 text-sm pt-4">
                {item.description}
              </p>

              <div className="flex justify-between mb-2 items-center py-4">
                <span className="text-sm text-gray-600 text-center">
                  <span className="text-lg text-black font-extrabold">
                    {item.products}
                  </span>{" "}
                  <br></br> Products
                </span>
                <span className="text-sm text-gray-600 text-center">
                  <span className="text-lg text-black font-extrabold">
                    {item.year}
                  </span>{" "}
                  <br></br> Years
                </span>
                <span className="text-sm text-gray-600 text-center">
                  <span className="text-lg text-black font-extrabold">
                    {item.price}
                  </span>{" "}
                  <br></br> Price
                </span>
              </div>
              <div className="flex flex-col text-black">
                {item?.phoneNumbers?.map((number, i) => (
                  <span className="text-base" key={i}>
                    {number}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-1/5 flex flex-col items-center justify-around space-y-2 text-center  font-medium">
              <Link href={`/details/${item.id}`}>
                <div className="cursor-pointer flex flex-col items-center">
                  <BsArrowRight size={20} />
                  <span className="text-xs">Details</span>
                </div>
              </Link>
              <div
                onClick={() => handleHide(index)}
                className="cursor-pointer flex flex-col items-center"
              >
                <FaRegEyeSlash size={20} />
                <span className="text-xs">Hide</span>
              </div>
              <div
                onClick={() => addToShortlist(item)}
                className="cursor-pointer flex flex-col items-center"
              >
                {isShortlisted ? (
                  <BsBookmarkHeartFill className="text-[#8D4337]" size={20} />
                ) : (
                  <BsBookmarkHeart className="text-[#8D4337]" size={20} />
                )}
                <span className="text-xs">Shortlist</span>
              </div>
              <div
                onClick={() => toast(`${item?.title} Is Report`)}
                className="cursor-pointer flex flex-col items-center"
              >
                <AiOutlineExclamationCircle size={20} />
                <span className="text-xs">Report</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Card;
