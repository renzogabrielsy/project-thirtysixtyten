import React, { useEffect, useState } from "react";
import { useColor } from "@/contexts/ColorContext";
import { getTextColor } from "@/lib/getTextColor";
import { Demo } from "./Demo";

const Hero: React.FC = () => {
  const { sixty, thirty, ten } = useColor();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 50); // 50ms delay for better reliability
  }, []);

  const scrollToBottom = () => {
    const element = document.getElementById("colorPickerComponent");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      style={{ backgroundColor: sixty }}
      className={`flex flex-col lg:flex-row items-center justify-evenly h-[95vh] text-center p-8 gap-10`}
    >
      <div>
        <h1
          style={{ color: getTextColor(sixty) }}
          className={`text-5xl font-bold mb-4 ${
            fadeIn
              ? "opacity-100 transition-opacity duration-1000 delay-150"
              : "opacity-0"
          }`}
        >
          sixtythirtyten.
        </h1>
        <p
          style={{ color: getTextColor(sixty) }}
          className={`text-lg mb-4 ${
            fadeIn
              ? "opacity-60 transition-opacity duration-1000 delay-300"
              : "opacity-0"
          }`}
        >
          The 60-30-10 rule visualized.
        </p>
        <button
          onClick={scrollToBottom}
          style={{ backgroundColor: ten, color: getTextColor(ten) }}
          className={`py-2 px-4 rounded-full text-lg font-semibold ${
            fadeIn
              ? "opacity-100 transition-opacity duration-1000 delay-700"
              : "opacity-0"
          }`}
        >
          Get started.
        </button>
      </div>
      <div className="flex flex-col gap-y-5">
        <div
          style={{ boxShadow: "2px 8px 20px 5px rgba(0, 0, 0, 0.25)" }}
          className={`flex scale-[83%] lg:scale-100 w-[300px] h-[300px] lg:min-w-[350px] lg:min-h-[350px] rounded-md ${
            fadeIn
              ? "opacity-100 transition-opacity duration-1000 delay-1000"
              : "opacity-0"
          }`}
        >
          <Demo />
        </div>
        <div>example bar</div>
      </div>
    </div>
  );
};

export default Hero;
