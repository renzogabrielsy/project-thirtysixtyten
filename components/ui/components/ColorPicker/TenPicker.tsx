import React from "react";
import { ChromePicker } from "react-color";
import { useColor } from "@/contexts/ColorContext";

export const TenPicker: React.FC = () => {
  const { setTen, ten } = useColor();

  const handleChange = (color: { hex: string }) => {
    setTen(color.hex);
  };

  return <ChromePicker color={ten} onChange={handleChange} className="" />;
};
