import React from "react";
import { ChromePicker } from "react-color";
import { useColor } from "@/contexts/ColorContext";

export const ThirtyPicker: React.FC = () => {
  const { setThirty, thirty } = useColor();

  const handleChange = (color: { hex: string }) => {
    setThirty(color.hex);
  };

  return <ChromePicker color={thirty} onChange={handleChange} className="" />;
};
