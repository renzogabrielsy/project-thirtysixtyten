import React from "react";
import { ChromePicker } from "react-color";
import { useColor } from "@/contexts/ColorContext";

export const SixtyPicker: React.FC = () => {
  const { setSixty, sixty } = useColor();

  const handleChange = (color: { hex: string }) => {
    setSixty(color.hex);
  };

  return <ChromePicker color={sixty} onChange={handleChange} className=""/>;
};
