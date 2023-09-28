// AuthenticatedView.tsx
import React, { useState } from "react";
import { useColor } from "@/contexts/ColorContext";
import { getTextColor } from "@/lib/getTextColor";
import { Button } from "@/components/ui/button";
import ColorSets from "./ColorSets";
import ColorSetDialog from "./ColorSetDialog";

export default function AuthenticatedView({ colorSets }) {
  const { sixty, thirty, ten, createColorSet } = useColor();
  const [setName, setSetName] = useState("");

  const handleAddColorSet = async (userId: string) => {
    await createColorSet(userId, setName);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center w-80">
      <ColorSets colorSets={colorSets} />
      <ColorSetDialog 
        setName={setName} 
        setSetName={setSetName}
        handleAddColorSet={handleAddColorSet} 
      />
    </div>
  );
}
