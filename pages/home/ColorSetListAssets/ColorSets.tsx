import React from 'react';
import { getTextColor } from "@/lib/getTextColor";

const ColorSets = ({ groupedColorSets, currentSlide, textColor }) => {
  return (
    <div className="h-[90%] flex flex-row flex-nowrap items-center overflow-x-hidden gap-x-4 gap-y-2 max-w-[calc(100%/1.2)] mb-3">
      {groupedColorSets.map((group, groupIndex) => (
        <div
          className={`flex flex-row gap-x-4 ${
            currentSlide !== groupIndex ? "hidden" : ""
          }`}
          key={groupIndex}
        >
          {group.map((set, index) => (
            <div
              key={index}
              className="text-xs flex flex-col justify-center items-center font-bold"
              style={{ color: textColor }}
            >
              {set.name ? set.name : "Unnamed Set"}
              {set.colorpreferences.map((pref, idx) => (
                <div key={idx}>
                  <div className="w-[100px] h-[20px] border border-black flex flex-row justify-center">
                    <div
                      style={{
                        backgroundColor: pref.sixty ?? "#000000",
                        color: getTextColor(pref.sixty ?? "#000000"),
                        boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                        border: "1px solid black",
                      }}
                      className="text-xs w-[45%] text-center"
                    >
                      60
                    </div>
                    <div
                      style={{
                        backgroundColor: pref.thirty ?? "#000000",
                        color: getTextColor(pref.thirty ?? "#000000"),
                        boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                        border: "1px solid black",
                      }}
                      className="text-xs w-[35%] text-center"
                    >
                      30
                    </div>
                    <div
                      style={{
                        backgroundColor: pref.ten ?? "#000000",
                        color: getTextColor(pref.ten ?? "#000000"),
                        boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                        border: "1px solid black",
                      }}
                      className="text-xs w-[30%] text-center"
                    >
                      10
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ColorSets;
