"use client"
import React, { createContext, useContext, useState } from "react";

const DatesContext = createContext();

export function DatesProvider({ children }) {
  const [latestDates, setLatestDates] = useState({
    startDate: null,
    endDate: null,
  });

  const updateDates = (start, end) => {
    setLatestDates({ startDate: start, endDate: end });
  };

  return (
    <DatesContext.Provider value={{ latestDates, updateDates }}>
      {children}
    </DatesContext.Provider>
  );
}

// Custom hook for easier usage
export function useDatesContext() {
  return useContext(DatesContext);
}
