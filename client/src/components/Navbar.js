import Image from "next/image";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

function Navbar() {
  return (
    <div className="flex items-center justify-between border-b pb-5 border-gray-200 p-4">
      <Image
        className="w-8 h-8"
        src="/image/logo-small 1.png"
        alt="Logo"
        width={100}
        height={50}
      />
      <h1 className="text-[#716966] font-black text-2xl ">EmptyCup</h1>
      <div>
        <BsThreeDotsVertical className="text-[27px] cursor-pointer" />
      </div>
    </div>
  );
}

export default Navbar;
