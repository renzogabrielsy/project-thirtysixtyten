"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { useColor } from "@/contexts/ColorContext";
import { getTextColor } from "@/lib/getTextColor";
import { NavLink } from "./NavLink";
import { UserContext } from "@/contexts/UserContext";
import { LoginPopUp } from "./LoginPopUp";
import MobileNavbar from "./MobileNavbar";
import { ProfilePopUp } from "./ProfilePopUp";

type Props = {};

export default function Navbar({}: Props) {
  const { thirty } = useColor();
  const navTextColor = getTextColor(thirty);
  const { user} = useContext(UserContext) ?? {};

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
          <div>
            <ProfilePopUp />
          </div>
        )}
      </div>
    </div>
  );
}
