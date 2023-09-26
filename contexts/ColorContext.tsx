import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface ColorContextType {
  sixty: string;
  setSixty: React.Dispatch<React.SetStateAction<string>>;
  thirty: string;
  setThirty: React.Dispatch<React.SetStateAction<string>>;
  ten: string;
  setTen: React.Dispatch<React.SetStateAction<string>>;
  createColorSet: (userId: string, setName: string) => Promise<void>;
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

  const createColorSet = async (user_id: string, name: string) => {
    const colors = [sixty, thirty, ten];
  
    console.log("Sending request with payload:", { user_id, name, colors });
  
    try {
      const response = await axios.post('/api/colorSets/createColorSet', { user_id, name, colors }, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      console.log('Success:', response.data);
    } catch (error: any) {
      console.log("Error:", JSON.stringify(error, null, 2));
  
      if (error.response) {
        console.log("Data:", error.response.data);
        console.log("Status:", error.response.status);
        console.log("Headers:", error.response.headers);
      } else if (error.request) {
        console.log("Request was made but no response was received", error.request);
      } else {
        console.log("Something happened setting up the request", error.message);
      }
    }
  };

  const value = {
    sixty,
    setSixty,
    thirty,
    setThirty,
    ten,
    setTen,
    createColorSet
  };

  useEffect(() => {
    const elements = document.querySelectorAll(`[style*="${sixty}"], [style*="${thirty}"], [style*="${ten}"]`);
    
    // console.log('Elements found:', elements);
  
    elements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      // console.log('Applying transition to:', htmlElement);
      htmlElement.style.transition = "background-color 0.3s ease-in-out, color 0.3s ease-in-out";
    });
  }, [sixty, thirty, ten]);

  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  );
};
