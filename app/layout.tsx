import "./globals.css";
import Navbar from "@/components/ui/components/Navbar/Navbar";
import { useColor } from "@/contexts/ColorContext";
import { Toaster } from "@/components/ui/toaster";
import { CheckForUsername } from "@/components/ui/components/Profile/CheckForUsername";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sixty, thirty, ten } = useColor();

  return (
    <>
      <Navbar />
      <CheckForUsername />
      <div style={{backgroundColor: sixty}}>{children}</div>
      <Toaster />
    </>
  );
}
