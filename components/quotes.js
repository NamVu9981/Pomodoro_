"use client";
import React, { useState } from "react";
import { useEffect } from "react";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const getQuotes = async () => {
      const randomQueryParam = Math.random(); // Generate a random number
      try {
        const response = await fetch(`/api/quotes?nocache=${randomQueryParam}`);
        const data = await response.json();
        setQuotes([data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    getQuotes(); // Fetch when the component mounts
  
    const intervalId = setInterval(() => {
      getQuotes(); // Fetch again every ten minutes
    }, 600000); // 600,000 milliseconds = 10 minutes
  
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);
  

  return (
    <div className="relative w-full h-full">
      <div
        className=" absolute left-16 top-16 w-60 h-auto p-6 rounded-3xl text-lg flex flex-col justify-center items-center"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
      >
        {quotes.map((quote, index) => (
          <div key={index}>
            <div>
              <p>"{quote.q}"</p>
            </div>
            <div>
              {" "}
              <p className="w-full flex justify-end  font-bold mt-3">
                - {quote.a}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
