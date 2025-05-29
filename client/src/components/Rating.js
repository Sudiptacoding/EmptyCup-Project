"use client";

import React from "react";
import { FaStar, FaStarHalfStroke, FaRegStar } from "react-icons/fa6";

function Rating({ rating = 0, totalStars = 5 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  return (
    <div className="flex space-x-1">
      {[...Array(totalStars)].map((_, i) => {
        const starNumber = i + 1;
        let icon;
        if (starNumber <= fullStars) {
          icon = <FaStar className="text-black w-5 h-5" />;
        } else if (starNumber === fullStars + 1 && hasHalfStar) {
          icon = <FaStarHalfStroke className="text-black w-5 h-5" />;
        } else {
          icon = <FaRegStar className="text-black w-5 h-5" />;
        }
        return <span key={i}>{icon}</span>;
      })}
    </div>
  );
}

export default Rating;
