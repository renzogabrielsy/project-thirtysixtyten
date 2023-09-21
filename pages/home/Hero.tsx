import React, { useEffect, useState } from 'react';
import { useColor } from '@/contexts/ColorContext';
import { getTextColor } from '@/lib/getTextColor';

const Hero: React.FC = () => {
  const { sixty, thirty, ten } = useColor();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 50); // 50ms delay for better reliability
  }, []);

  const scrollToBottom = () => {
    const element = document.getElementById("colorPickerComponent");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
      style={{ backgroundColor: sixty }} 
      className={`flex flex-col items-center justify-center h-[95vh] text-center p-8`}
    >
      <h1 
        style={{ color: getTextColor(sixty) }} 
        className={`text-5xl font-bold mb-4 ${fadeIn ? 'opacity-100 transition-opacity duration-1000 delay-150' : 'opacity-0'}`}
      >
        sixtythirtyten.
      </h1>
      <p 
        style={{ color: getTextColor(sixty) }} 
        className={`text-lg mb-4 ${fadeIn ? 'opacity-60 transition-opacity duration-1000 delay-500' : 'opacity-0'}`}
      >
        The 60-30-10 rule visualized.
      </p>
      <button 
        onClick={scrollToBottom}
        style={{ backgroundColor: ten, color: getTextColor(ten)}} 
        className={`py-2 px-4 rounded-full text-lg font-semibold ${fadeIn ? 'opacity-100 transition-opacity duration-1000 delay-1000' : 'opacity-0'}`}
      >
        Get started.
      </button>
    </div>
  );
};

export default Hero;
