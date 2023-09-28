"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import { useColor } from "@/contexts/ColorContext";
import { Button } from "@/components/ui/button";
import { getTextColor } from "@/lib/getTextColor";
import { NavLink } from "./NavLink";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserContext } from "@/contexts/UserContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LoginPopUp } from "./LoginPopUp";
import MobileNavbar from "./MobileNavbar";

type Props = {};

export default function Navbar({}: Props) {
  const { sixty, thirty, ten } = useColor();
  const navTextColor = getTextColor(thirty);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { user, handleSignOut } = useContext(UserContext) ?? {};

  return (
    <div
      style={{
        backgroundColor: thirty,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      className="sticky top-0 z-50 flex flex-row justify-between w-full h-12 px-8 lg:px-20 py-8 shadow-md"
    >
      <div
        style={{ color: navTextColor }}
        className="hidden lg:flex flex-row items-center justify-center gap-x-6"
      >
        <NavLink href="/about" label="About" />
        <NavLink href="/contact" label="Contact" />
      </div>

      <MobileNavbar />

      <div
        style={{ color: navTextColor }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:flex flex-col justify-center font-bold"
      >
        <Link href="/">sixtythirtyten</Link>
      </div>

      <div className="flex flex-row justify-center items-center text-white">
        {!user ? (
          <div>
            <LoginPopUp />
          </div>
        ) : (
          <Button onClick={handleSignOut}>Sign Out</Button>
        )}
      </div>
    </div>
  );
}
