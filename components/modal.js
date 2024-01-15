import React from "react";
import { IoCloseCircle } from "react-icons/io5";


export default function modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 z-50"
        style={{ backgroundColor: "rgba(0, 0, 0, .7)" }}
      >
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-200 w-1/4 lg:w-1/2 2xl:w-1/3 h-auto rounded-3xl p-9">
          <button className="absolute right-2 top-3" onClick={onClose}>
            {" "}
            <IoCloseCircle />
          </button>
          <div className="flex justify-center items-center p-9 text-3xl 2xl:text-xl lg:text-lg"> {children}</div>
        </div>
      </div>
    </>
  );
}
