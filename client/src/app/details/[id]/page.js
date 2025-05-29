"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Rating from "@/components/Rating"; 
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";

const DetailPage = () => {
  const { id } = useParams(); 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:5000/tech/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-center text-gray-500">
        No data found for ID: {id}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg">
      <Link href={'/'}><h1 className="text-sm font-extrabold mb-4 text-gray-900  flex items-center gap-1 justify-end cursor-pointer">
       <FaArrowLeftLong /> Home
      </h1></Link>
      <h1 className="text-3xl font-extrabold mb-4 text-gray-900">
        Detail Page
      </h1>
      <p className="mb-6 text-sm text-gray-600">Item ID: {id}</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        {data.title || "Untitled"}
      </h2>
      {data.rating && (
        <div className="flex items-center text-yellow-500 mb-4">
          <Rating rating={data.rating} className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium text-gray-700 pl-4">{data.rating}</span>
        </div>
      )}
      <p className="text-gray-700 mb-6 leading-relaxed">
        {data.description || "No description available."}
      </p>
      <div className="flex justify-between items-center text-center mb-6">
        <div>
          <div className="text-lg font-semibold text-gray-800">{data.products ?? "-"}</div>
          <div className="text-xs text-gray-500">Products</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-gray-800">{data.year ?? "-"}</div>
          <div className="text-xs text-gray-500">Years</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-gray-800">{data.price ?? "-"}</div>
          <div className="text-xs text-gray-500">Price</div>
        </div>
      </div>
      {data.phoneNumbers?.length > 0 && (
        <div className="p-4 rounded-lg text-gray-800 space-y-1">
          <h3 className="font-semibold mb-2">Phone Numbers:</h3>
          {data.phoneNumbers.map((number, i) => (
            <p key={i}>{number}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DetailPage;
