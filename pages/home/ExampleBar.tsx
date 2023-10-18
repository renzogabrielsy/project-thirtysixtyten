import React, { useState, useEffect } from "react";
import { useColor } from "@/contexts/ColorContext";
import useEmblaCarousel from "embla-carousel-react";
import { getTextColor } from "@/lib/getTextColor";
import { get } from "http";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
type Props = {};

const exampleColors = [
  {
    name: "sexy monkey",
    sixty: "#8aaff3",
    thirty: "#703131",
    ten: "#ddddea", // Removed extra '#' symbol
  },
  {
    name: "purple durple v2",
    sixty: "#b0bbcf",
    thirty: "#e2d6d6",
    ten: "#7d7dff",
  },
  {
    name: "icy",
    sixty: "#d6ddea",
    thirty: "#e2d6d6",
    ten: "#7d7dff",
  },
  {
    name: "midnight",
    sixty: "#282b30",
    thirty: "#e2d6d6",
    ten: "#0000a9",
  },
  {
    name: "dragon age",
    sixty: "#8a0000",
    thirty: "#310000",
    ten: "#fdd100",
  },
  {
    name: "banana sundae",
    sixty: "#fafb35",
    thirty: "#ffb0b0",
    ten: "#6ad9c3",
  },
];

function ExampleBar({}: Props) {
  const { sixty, thirty, ten, setSixty, setThirty, setTen } = useColor();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <button
          className="bg-none font-bold p-2 mr-2"
          onClick={() => emblaApi && emblaApi.scrollPrev()}
          style={{ color: ten }}
        >
          <IoIosArrowBack size={25} />
        </button>
        <div
          className="embla"
          ref={emblaRef}
          style={{
            backgroundColor: thirty,
            borderRadius: "10px 10px 10px 10px",
            padding: "2px",
          }}
        >
          <div className="embla__container flex flex-row">
            {exampleColors.map((color, index) => (
              <div
                key={index}
                className="embla__slide flex flex-col justify-center items-center p-2 rounded-xl"
                style={{
                  backgroundColor: thirty,
                }}
              >
                <div
                  className="flex flex-row justify-center items-center rounded-2xl shadow-lg hover:cursor-pointer hover:scale-105 duration-300"
                  style={{}}
                  onClick={() => {
                    setSixty(color.sixty);
                    setThirty(color.thirty);
                    setTen(color.ten);
                  }}
                >
                  <div
                    style={{ backgroundColor: color.sixty }}
                    className="w-16 h-8 rounded-s-xl"
                  ></div>
                  <div
                    style={{ backgroundColor: color.thirty }}
                    className="w-16 h-8"
                  ></div>
                  <div
                    style={{ backgroundColor: color.ten }}
                    className="w-16 h-8 rounded-e-xl"
                  ></div>
                </div>
                <div
                  className="text-center font-bold"
                  style={{ color: getTextColor(thirty) }}
                >
                  {color.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="bg-non p-2 ml-2"
          onClick={() => emblaApi && emblaApi.scrollNext()}
          style={{ color: ten }}
        >
          <IoIosArrowForward size={25} />
        </button>
      </div>
      <div className="flex flex-row justify-center items-center mt-4 space-x-2">
        {exampleColors.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full`}
            style={{
              backgroundColor: `${selectedIndex === index ? ten : "gray"}`,
            }}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
          ></button>
        ))}
      </div>
    </>
  );
}

export default ExampleBar;
