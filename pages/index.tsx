import React, { useState, useEffect, useContext } from "react";
import { ColorPickerComponent } from "@/components/ui/components/ColorPicker/ColorPickerComponent";
import Hero from "./home/Hero";
import { getTextColor } from "@/lib/getTextColor";
import { useColor } from "@/contexts/ColorContext";
import { AiOutlineArrowUp } from "react-icons/ai";
import ColorSetList from "./home/ColorSetList";
import ColorSelection from "./home/ColorSelection";

const Home: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;

    // You may adjust the condition based on your needs
    if (scrollTop + clientHeight >= scrollHeight) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { sixty, thirty, ten } = useColor();
  const textColor = getTextColor(sixty);
  const boxShadow = "5px 8px 10px 0px rgba(0, 0, 0, 0.25)";
  const commonClassNames =
    "scale-[83%] lg:scale-100 w-[300px] h-[300px] lg:min-w-[350px] lg:min-h-[350px]";

  return (
    <div>
      <div>
        <Hero />
      </div>
      <div className="flex flex-col justify-center items-center h-[100vh] gap-y-5">
        <h1
          style={{ color: getTextColor(sixty) }}
          className="text-4xl lg:text-4xl font-bold lg:h-30 lg:justify-end flex justify-center lg:items-center text-center mt-16"
        >
          color picker.
        </h1>
        <div
          id="colorPickerComponent"
          className="flex flex-col justify-center lg:justify-center items-center w-[90%] h-[80vh] lg:h-[75%] rounded-lg"
          style={{ backgroundColor: thirty, boxShadow }}
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            <div
              style={{
                backgroundColor: sixty,
                boxShadow: "4px 7px 5px rgba(0, 0, 0, 0.25)",
              }}
              className="h-[45%] lg:h-64 p-4 w-[85%] lg:w-[100%] flex flex-col justify-center items-center rounded-md gap-y-3 mt-6"
            >
              <ColorSetList />
              <ColorSelection />
            </div>

            <div className="flex flex-col lg:w-[95%] lg:px-[8%] justify-center items-center">
              <div className="flex flex-col justify-center lg:justify-evenly items-center gap-x-6 lg:flex-row lg:items-start lg:pt-8 w-full h-full">
                <div style={{}} className={commonClassNames}>
                  <ColorPickerComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 p-2 rounded-full text-3xl hover:scale-110 transition-all duration-500"
        style={{
          opacity: showScrollTop ? 1 : 0,
          transition: "opacity 0.15s ease-in-out",
          color: getTextColor(ten),
          backgroundColor: ten,
        }}
      >
        <AiOutlineArrowUp />
      </button>
    </div>
  );
};

export default Home;
