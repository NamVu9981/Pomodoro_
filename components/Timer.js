"use client";

import { useCallback, useEffect } from "react";
import { useState } from "react";
import clickAudio from "../public/click-21156 (mp3cut.net).mp3";
import finshAudio from "../public/Sherbourne St 7.mp3";
import breakAudio from "../public/713893__froey__casio-f-91w-alarm-[AudioTrimmer.com].mp3";
import { IoIosSkipForward } from "react-icons/io";
import { IoVolumeMuteSharp } from "react-icons/io5";
import { IoVolumeHighSharp } from "react-icons/io5";

const Timer = () => {
  const workDuration = 25 * 60; // 25 minutes converted to seconds
  const shortBreakDuration = 5 * 60; // 5 minutes converted to seconds
  const longBreakDuration = 15 * 60;
  const [activeTab, setActiveTab] = useState("pomodoro");
  const [secondsLefts, setSecondsLeft] = useState(workDuration);
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    switch (tabName) {
      case "pomodoro":
        setSecondsLeft(workDuration);
        break;
      case "shortBreak":
        setSecondsLeft(shortBreakDuration);
        break;
      case "longBreak":
        setSecondsLeft(longBreakDuration);
        break;
      default:
        setSecondsLeft(workDuration);
    }
  };
  const handleSessionComplete = (nextTab) => {
    handleTabClick(nextTab);
  };
  const renderContent = () => {
    return (
      <TimerCal
        session={activeTab}
        secondsLeft={secondsLefts}
        onSessionComplete={handleSessionComplete}
      />
    );
  };
  return (
    <div>
      <div className="flex flex-col gap-10 ">
        <div className="flex whitespace-nowrap gap-10 sm:gap-4">
          <button
            className={`px-8 py-2 sm:px-2 sm:py-1 rounded-lg font-semibold text-xl sm:text-base ${
              activeTab === "pomodoro"
                ? "bg-white text-black"
                : "bg-white opacity-50"
            }`}
            onClick={() => handleTabClick("pomodoro")}
          >
            Pomodoro
          </button>
          <button
            className={`px-8 py-2 sm:px-2 sm:py-0 rounded-lg font-semibold text-xl sm:text-base ${
              activeTab === "shortBreak"
                ? "bg-white text-black"
                : "bg-white opacity-50"
            }`}
            onClick={() => handleTabClick("shortBreak")}
          >
            Short Break
          </button>
          <button
            className={`px-8 py-2 sm:px-2 sm:py-0 rounded-lg font-semibold text-xl sm:text-base ${
              activeTab === "longBreak"
                ? "bg-white text-black"
                : "bg-white opacity-50"
            }`}
            onClick={() => handleTabClick("longBreak")}
          >
            Long Break
          </button>
        </div>
        <div>{renderContent()}</div>
      </div>
    </div>
  );
};

function TimerCal({ session, secondsLeft, onSessionComplete }) {
  const [secondsLefts, setSecondsLefts] = useState(secondsLeft);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [click, setClick] = useState(null);
  const [finishSound, setFinishSound] = useState(null);
  const [breakSound, setBreakSound] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const style = { color: "white", fontSize: "1.5em" };
  const volStyle = { fontSize: "1.4em" };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setClick(new Audio(clickAudio));
      setFinishSound(new Audio(finshAudio));
      setBreakSound(new Audio(breakAudio));
    }
  }, []);
  useEffect(() => {
    setSecondsLefts(secondsLeft);
  }, [secondsLeft]);
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLefts((secondsLefts) => secondsLefts - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLefts]);
  const handleSessionTransition = useCallback(() => {
    const newCount = sessionCount + 1;
    if (session === "pomodoro") {
      breakSound.play();
      if (newCount === 5) {
        onSessionComplete("longBreak");
        setSessionCount(0); // Reset the counter after a long break
      } else {
        onSessionComplete("shortBreak");
      }
    } else {
      // After any break, return to pomodoro
      onSessionComplete("pomodoro");
      finishSound.play();
      if (session === "longBreak") {
        setSessionCount(0); // Reset the counter after a long break
        setIsRunning(false);
      } else {
        setSessionCount(newCount);
      }
    }
  }, [sessionCount, session, onSessionComplete, breakSound, finishSound]);
  useEffect(() => {
    if (secondsLefts === 0) {
      setIsRunning(true);
      handleSessionTransition();
    }
  }, [secondsLefts, handleSessionTransition]);
  useEffect(() => {
    if (click && finishSound && breakSound) {
      if (isMuted) {
        click.volume = 0;
        finishSound.volume = 0;
        breakSound.volume = 0;
      } else {
        click.volume = 1;
        finishSound.volume = 1;
        breakSound.volume = 1;
      }
    }
  }, [isMuted, click, finishSound, breakSound]);
  const toggleTimer = () => {
    click.play();
    if (secondsLefts === 25 * 60) {
      finishSound.play();
    }
    setIsRunning(!isRunning);
  };
  const skipTimer = () => {
    const newCount = sessionCount + 1;
    if (session === "pomodoro") {
      if (newCount === 5) {
        onSessionComplete("longBreak");
      } else {
        onSessionComplete("shortBreak");
      }
    } else if (session === "shortBreak") {
      onSessionComplete("pomodoro");
      if (newCount === 5) {
        setSessionCount(0);
      } else {
        setSessionCount(newCount);
      }
    } else {
      if (newCount === 5) {
        setSessionCount(0);
      } else {
        setSessionCount(newCount);
      }
      onSessionComplete("pomodoro");
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-20 mb-40 lg:mb-10">
      <button
        className="absolute right-10 top-40 md:invisible"
        onClick={() => setIsMuted(!isMuted)}
      >
        {isMuted ? (
          <IoVolumeMuteSharp style={volStyle} />
        ) : (
          <IoVolumeHighSharp style={volStyle} />
        )}
      </button>
      <div
        className="h-96 relative p-2 flex flex-col justify-center items-center w-full bg-white rounded-md"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
      >
        <div className="text-4xl sm:text-2xl absolute text-white opacity-80  top-6 right-10">
          #{sessionCount}
        </div>
        <div className="text-8xl sm:text-7xl font-bold text-white mb-5">
          {String(Math.floor(secondsLefts / 60)).padStart(2, "0")}:
          {String(secondsLefts % 60).padStart(2, "0")}
        </div>
        <div className="flex justify-center w-full h-10 text-2xl font-medium">
          <button
            className="border-1 rounded w-1/3 bg-white sm:w-1/4"
            onClick={toggleTimer}
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            className={`absolute right-36 transition-opacity duration-400 sm:right-16 ${
              isRunning ? "opacity-100" : "opacity-0"
            }`}
            onClick={skipTimer}
          >
            <IoIosSkipForward style={style} />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Timer;
