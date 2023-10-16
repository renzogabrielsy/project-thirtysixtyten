import React, { FC, useState } from "react";
import { getTextColor } from "@/lib/getTextColor";
import { FaPaste } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useColor } from "@/contexts/ColorContext";

interface ColorBoxProps {
  label: string;
  color: string;
  textColor: string;
}

export const ColorBox: FC<ColorBoxProps> = ({ label, color, textColor }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  const { sixty } = useColor();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(color).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Revert back to the original state after 2 seconds
    });
    toast({
      variant: "default",
      duration: 2000,
      title: "Copied!",
      description: `Successfully copied ${color} to clipboard!`,
    });
  };
  return (
    <div className="group flex flex-row justify-start items-center">
      <h1
        style={{ color: textColor }}
        className="text-sm lg:text-lg font-semibold w-12 lg:w-16"
      >
        {label}.
      </h1>
      <div
        style={{
          backgroundColor: color,
          color: getTextColor(color),
          border: "2px solid",
          borderColor: textColor,
          boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
        }}
        className="pl-4 mr-2 lg:pr-4 w-[120px] lg:w-[200px] rounded-md h-6 flex flex-row justify-between items-center font-bold transition-all ease-in-out"
      >
        <div>{color}</div>
        {/* <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out cursor-pointer">
            {isCopied ? "Copied!" : ""}
          </div> */}
      </div>
      <Button
        onClick={handleCopyClick}
        className="transition-opacity duration-300 ease-in-out p-0 h-7 w-7 rounded-sm"
        style={{
          border: "2px solid",
          borderColor: getTextColor(sixty),
          color: getTextColor(sixty),
          backgroundColor: sixty,
        }}
      >
        <FaPaste />
      </Button>
    </div>
  );
};
