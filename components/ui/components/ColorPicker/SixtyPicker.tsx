import React from "react";
import { HexColorPicker } from "react-colorful"
import { useColor } from "@/contexts/ColorContext";

export const SixtyPicker: React.FC = () => {
  const { setSixty, sixty } = useColor();

  const handleChange = (color: string) => {
    setSixty(color);
  };

  return <HexColorPicker color={sixty} onChange={handleChange} className=""/>;
};
