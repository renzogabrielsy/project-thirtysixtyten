import "./globals.css";
import Navbar from "@/components/ui/components/Navbar/Navbar";
import { useColor } from "@/contexts/ColorContext";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sixty, thirty, ten } = useColor();

  return (
    <>
      <Navbar />
      <div style={{backgroundColor: sixty}}className="w-full px-0 lg:px-20 transition-all ease-in-out">{children}</div>
      <Toaster />
    </>
  );
}
