import React from "react";
import { getTextColor } from "@/lib/getTextColor";
import { useColor } from "@/contexts/ColorContext";
import { ColorBox } from "./ColorBox";

type Props = {};

export default function ColorSelection({}: Props) {
  const { sixty, thirty, ten } = useColor();
  const colors = [
    { label: "sixty", color: sixty },
    { label: "thirty", color: thirty },
    { label: "ten", color: ten },
  ];

  const textColor = getTextColor(sixty);
  return (
        <div className="lg:w-fit mb-1 lg:mb-2 flex flex-col w-full lg:justify-center items-center gap-y-1 lg:gap-y-2 text-xs">
          {colors.map((colorObj) => (
            <ColorBox
              key={colorObj.label}
              label={colorObj.label}
              color={colorObj.color}
              textColor={textColor}
            />
          ))}
        </div>
  );
}
