import React from "react";
import { HexColorPicker } from "react-colorful"
import { useColor } from "@/contexts/ColorContext";

export const ThirtyPicker: React.FC = () => {
  const { setThirty, thirty } = useColor();

  const handleChange = (color: string) => {
    setThirty(color);
  };

  return <HexColorPicker color={thirty} onChange={handleChange} className="" />;
};
