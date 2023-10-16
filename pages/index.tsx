import React, { useState, useEffect, useContext } from "react";
import { ColorPickerComponent } from "@/components/ui/components/ColorPicker/ColorPickerComponent";
import Hero from "./home/Hero";
import { getTextColor } from "@/lib/getTextColor";
import { useColor } from "@/contexts/ColorContext";
import { AiOutlineArrowUp } from "react-icons/ai";
import ColorSet from "./home/ColorSet";
import ColorSelection from "./home/ColorSelection";
import { DisplayPicture } from "@/components/ui/components/Profile/DisplayPicture";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ColorSetList from "./home/ColorSetList";
import { UserContext } from "@/contexts/UserContext";
import Link from "next/link";

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
  const { user, userProfile } = useContext(UserContext) ?? {};
  const textColor = getTextColor(sixty);
  const boxShadow = "5px 8px 10px 0px rgba(0, 0, 0, 0.25)";
  const commonClassNames =
    "scale-[83%] lg:scale-100 w-[300px] h-[300px] lg:min-w-[350px] lg:min-h-[310px]";

  return (
    <div>
      <div className="hero-root">
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
              className="h-[39%] lg:h-[39%] p-3 w-[85%] lg:w-[100%] flex flex-col justify-end items-center rounded-md gap-y-1 mt-6 lg:mt-0"
            >
              {!user ? (
                <div className="h-full flex flex-col justify-center items-center">
                  <Button
                    style={{
                      backgroundColor: ten,
                      color: getTextColor(ten),
                      boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                    }}
                    className="w-full gap-x-3 flex flex-row justify-center items-center hover:opacity-90"
                  >
                    <Link href="/auth">Login to save choices</Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-row justify-center w-full h-full items-center">
                  <div className="flex flex-col justify-center items-center w-[40%]">
                    <div
                      style={{ backgroundColor: thirty }}
                      className="flex justify-center items-center w-8 h-8 lg:w-14 lg:h-14 rounded-full"
                    >
                      <DisplayPicture className="w-8 h-8 lg:h-14 lg:w-14 bg-gray-400" />
                    </div>
                    <span className="text-[10px] font-bold lg:text-sm" style={{color: getTextColor(sixty)}}>
                      {userProfile?.username}
                    </span>
                  </div>
                  <div className="flex justify-center lg:justify-start items-center w-full pb-2">
                    <ColorSetList />
                  </div>
                </div>
              )}

              <ColorSelection />
              <ColorSet />
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
