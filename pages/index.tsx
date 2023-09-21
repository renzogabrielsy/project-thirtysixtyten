import React, { useState, useEffect, useContext } from "react";
import { ColorPickerComponent } from "@/components/ui/components/ColorPicker/ColorPickerComponent";
import Hero from "./home/Hero";
import { Demo } from "./home/Demo";
import { getTextColor } from "@/lib/getTextColor";
import { useColor } from "@/contexts/ColorContext";
import { ColorBox } from "./home/ColorBox";
import { AiOutlineArrowUp } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";

const Home: React.FC = () => {
  const { user } = useContext(UserContext) ?? {};

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

  const colors = [
    { label: "sixty", color: sixty },
    { label: "thirty", color: thirty },
    { label: "ten", color: ten },
  ];

  const textColor = getTextColor(thirty);
  const boxShadow = "5px 8px 10px 0px rgba(0, 0, 0, 0.25)";
  const commonClassNames =
    "scale-[83%] lg:scale-100 w-[300px] h-[300px] lg:min-w-[350px] lg:min-h-[350px]";

  return (
    <div>
      <div>
        <Hero />
      </div>
      <div className="flex flex-row justify-center items-center h-[100vh]">
        <div
          id="colorPickerComponent"
          className="flex flex-col justify-evenly lg:justify-center items-center w-[90%] h-[88vh] lg:h-[85%] mt-16 lg:mt-16 rounded-lg lg:pb-6"
          style={{ backgroundColor: thirty, boxShadow }}
        >
          <h1
            style={{ color: textColor }}
            className="text-[22px] lg:text-4xl font-bold h-16 lg:h-30 lg:justify-end flex justify-center items-end lg:items-center text-center"
          >
            color preview.
          </h1>
          <div className="flex flex-col justify-evenly items-center h-[88%]">
            <div className="h-[10%] p-4 w-[95%] lg:w-[50%] flex flex-row justify-center items-center rounded-md lg:mb-4">
              {!user ? (
                <Button
                  style={{ backgroundColor: ten, color: getTextColor(ten) }}
                  className="w-full gap-x-3 flex flex-row justify-center items-center hover:opacity-90"
                >
                  <FcGoogle />
                  <Link href="/auth">Login to save choices</Link>
                </Button>
              ) : (
                <Button>Save</Button>
              )}
            </div>
            <div className="flex flex-col lg:w-[95%] lg:px-[8%] justify-center items-center">
              <div className="lg:h-full lg:w-fit mb-1 lg:mb-2 flex flex-col w-full lg:justify-center items-center gap-y-1 lg:gap-y-2 text-xs">
                {colors.map((colorObj) => (
                  <ColorBox
                    key={colorObj.label}
                    label={colorObj.label}
                    color={colorObj.color}
                    textColor={textColor}
                  />
                ))}
              </div>

              <div className="flex flex-col justify-center lg:justify-evenly items-center gap-x-6 lg:flex-row lg:items-start lg:pt-8 w-full h-full">
                <div
                  style={{ boxShadow }}
                  className={`hidden lg:block ${commonClassNames}`}
                >
                  <Demo />
                </div>
                <div style={{ boxShadow }} className={commonClassNames}>
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
