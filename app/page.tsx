"use client";
import Image from "next/image";
import Time from "../components/time";
import Timer from "../components/Timer";
import Modal from "../components/modal";
import Quote from "../components/quotes";
import Spinner from "../components/spinner";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { useEffect, useState } from "react";
require("dotenv").config();

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [backgroundStyle, setBackgroundStyle] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const style = { color: "black", fontSize: "1.5em" };
  useEffect(() => {
    let currentLat: number, currentLng: number;
    const getSunriseSunset = async (lat: number, lng: number) => {
      const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&tzid=America/Toronto&formatted=0`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const sunrise = data.results.sunrise;
        const sunset = data.results.sunset;
        const now = new Date();
        const nowTime = now
          .toLocaleTimeString("en-US", { hour12: false })
          .split(":")[0];
        if (
          nowTime >= sunrise.split("T")[1].split(":")[0] &&
          nowTime < sunset.split("T")[1].split(":")[0]
        ) {
          setBackgroundStyle("/1327497.png");
        } else {
          setBackgroundStyle("/1333576.png");
        }
        setIsImageLoaded(true);
      } catch (error) {
        console.error("Error fetching sunrise-sunset data:", error);
      }
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          currentLat = position.coords.latitude;
          currentLng = position.coords.longitude;
          getSunriseSunset(currentLat, currentLng);
        },
        (error) => {
          console.error("Geolocation error:", error);
          getSunriseSunset(43.653225, -79.383186);
        }
      );
    } else {
      console.log("Geolocation is not supported by the browser.");
    }
    const intervalId = setInterval(() => {
      if (currentLat && currentLng) {
        getSunriseSunset(currentLat, currentLng);
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    // Set up a resize event listener
    const handleResize = () => {
      // Check if screen width is less than or equal to 640 pixels
      setIsMobile(window.innerWidth <= 640);
    };

    // Call the handleResize function to set the initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {!isImageLoaded && (
        <div className="flex justify-center items-center w-full h-full fixed inset-0 z-50 bg-neutral-100">
          <Spinner />
        </div>
      )}
      {isImageLoaded && (
        <div className="relative h-screen">
          <div className=" flex flex-col w-full h-full absolute z-10 text-4xl font-medium justify-center items-center">
            <div className="absolute top-10 right-10 md:invisible lg:right-1">
              {" "}
              <Time />
            </div>
            <div className="z-50 md:invisible">
              <button
                onClick={() => setIsOpen(true)}
                className="absolute text-white right-12 top-24 text-black"
              >
                <RxQuestionMarkCircled style={style} />
              </button>

              <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                The Pomodoro Technique is a time management method based on
                25-minute stretches of focused work broken by five-minute
                breaks. Longer breaks, typically 15 to 30 minutes, are taken
                after four consecutive work intervals. Each work interval is
                called a pomodoro, the Italian word for tomato
              </Modal>
            </div>
            <div className="w-full h-full z-1 absolute xl:visible lg:invisible">
              <Quote />
            </div>
            <div className="z-10 w-full h-full flex mt-5 justify-center items-center">
              <div className="z-9  w-1/5 h-1/3">
                <div className="flex justify-center items-center w-full h-full">
                  {" "}
                  <Timer />
                </div>
              </div>
            </div>
          </div>

          {/* <div className=" absolute z-10 w-full h-full flex justify-center items-center">
          <Input />
        </div> */}
          <Image
            className="object-cover z-0 absolute w-full h-full"
            src={
              isMobile
                ? "/forest-scenery-watchtower-firewatch-digital-art-background-phone-wallpaper-4k-uhdpaper.com-426@0@e.jpg"
                : `${backgroundStyle}`
            } // Fallback for browsers that do not support <picture>
            alt="Pomodoro"
            fill
            priority
          />
        </div>
      )}
    </>
  );
}
