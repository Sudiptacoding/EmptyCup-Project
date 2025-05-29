'use client';

import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
const ShortlistContext = createContext();

export function ShortlistProvider({ children }) {
  const [shortlist, setShortlist] = useState([]);
  const addToShortlist = (item) => {
    toast(`${item?.title} Is now Added`)
    setShortlist((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromShortlist = (id) => {
    setShortlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ShortlistContext.Provider value={{ shortlist, addToShortlist, removeFromShortlist }}>
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  return useContext(ShortlistContext);
}
