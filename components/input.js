"use client";

import { useState } from "react";

export default function Input() {
  const [inputs, setInputs] = useState("");
  const handleSubmit = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DALLE_API}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: inputs,
        n: 1,
        size: "1792x1024",
      }),
    };
    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        options
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-20 w-full">
      <div>
        <p className="text-6xl">Let&apos;s change your background </p>
      </div>
      <div className="flex flex-col gap-16 width-full">
        <input
          className="text-black rounded-md  w-96 h-10"
          type="text"
          name="name"
          onChange={(e) => setInputs(e.target.value)}
          value={inputs}
        ></input>
        <button className="text-2xl font-medium" onClick={handleSubmit}>Generate background</button>
      </div>
    </div>
  );
}
