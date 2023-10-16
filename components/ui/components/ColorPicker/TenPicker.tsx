import React from "react";
import { HexColorPicker } from "react-colorful"
import { useColor } from "@/contexts/ColorContext";

export const TenPicker: React.FC = () => {
  const { setTen, ten } = useColor();

  const handleChange = (color: string) => {
    setTen(color);
  };

  return <HexColorPicker color={ten} onChange={handleChange} className="" />;
};
