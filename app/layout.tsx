import "./globals.css";
import Navbar from "@/components/ui/components/Navbar/Navbar";
import { useColor } from "@/contexts/ColorContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sixty, thirty, ten } = useColor();

  return (
    <>
      <Navbar />
      <div style={{backgroundColor: sixty}}className="w-full px-0 lg:px-20">{children}</div>
    </>
  );
}
