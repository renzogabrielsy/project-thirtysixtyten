// UnauthenticatedView.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useColor } from "@/contexts/ColorContext";
import { getTextColor } from "@/lib/getTextColor";

export default function UnauthenticatedView() {
  const { ten } = useColor();

  return (
    <Button
      style={{
        backgroundColor: ten,
        color: getTextColor(ten),
        boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
      }}
      className="w-full gap-x-3 flex flex-row justify-center items-center hover:opacity-90"
    >
      <FcGoogle />
      <Link href="/auth">Login to save choices</Link>
    </Button>
  );
}
