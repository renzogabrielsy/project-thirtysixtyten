import React, { createContext, useContext, useState } from "react";

interface ColorContextType {
  sixty: string;
  setSixty: React.Dispatch<React.SetStateAction<string>>;
  thirty: string;
  setThirty: React.Dispatch<React.SetStateAction<string>>;
  ten: string;
  setTen: React.Dispatch<React.SetStateAction<string>>;
}

const ColorContext = createContext<ColorContextType | null>(null);

export const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
};

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [sixty, setSixty] = useState("#FFFFFF");
  const [thirty, setThirty] = useState("#000000");
  const [ten, setTen] = useState("#0000FF");

  const value = {
    sixty,
    setSixty,
    thirty,
    setThirty,
    ten,
    setTen,
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};
