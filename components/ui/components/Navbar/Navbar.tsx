"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import { useColor } from "@/contexts/ColorContext";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { getTextColor } from "@/lib/getTextColor";
import { NavLink } from "./NavLink";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserContext } from "@/contexts/UserContext";
import axios from "axios";
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

      <div className="lg:hidden flex flex-col justify-center items-start">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            style={{ color: navTextColor }}
            className="flex flex-row justify-center items-center gap-x-2"
          >
            <GiHamburgerMenu size={24} />
            <p className="text-lg font-semibold">sixtythirtyten</p>
          </SheetTrigger>
          <SheetContent
            side={"top"}
            style={{ backgroundColor: thirty }}
            className="flex flex-col justify-center items-start"
          >
            <SheetHeader>
              <SheetTitle style={{ color: getTextColor(thirty) }}>
                <div
                  onClick={() => setSheetOpen(false)}
                  className="hover:underline"
                >
                  <NavLink href="/" label="sixtythirtyten" />
                </div>
              </SheetTitle>
              <SheetDescription
                style={{ color: getTextColor(thirty), opacity: 0.6 }}
                className="flex flex-col justify-center items-start gap-y-4"
              >
                <div
                  onClick={() => setSheetOpen(false)}
                  className="hover:underline"
                >
                  <NavLink href="/about" label="About" />
                </div>
                <div
                  onClick={() => setSheetOpen(false)}
                  className="hover:underline"
                >
                  <NavLink href="/contact" label="Contact" />
                </div>
                {/* <div
                  onClick={() => setSheetOpen(false)}
                  className="hover:underline"
                >
                  <NavLink href="/tech" label="Tech Stack" />
                </div> */}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div
        style={{ color: navTextColor }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:flex flex-col justify-center font-bold"
      >
        <Link href="/">sixtythirtyten</Link>
      </div>

      <div className="flex flex-row justify-center items-center text-white">
        {!user ? (
          // <Button
          //   variant="default"
          //   className="relative w-[6.5rem] h-[2.5rem] rounded-full bg-slate-100 hover:w-[6.5rem] hover:drop-shadow-md hover:bg-white text-black transition-all ease-out duration-300 group"
          // >
          //   <div className="flex flex-row justify-center items-center gap-x-1 group-hover:scale-[108%] transition-transform duration-300">
          //     <div className="text-2xl">
          //       <FcGoogle />
          //     </div>
          //     <div className="opacity-100 group-hover:opacity-100 transition-opacity duration-0 group-hover:translate-x-0 group-hover:relative hover:duration-300">
          //       <Link href="/auth">Login</Link>
          //     </div>
          //   </div>
          // </Button>
          <div>
            <LoginPopUp />
          </div>
        ) : (
          <Button onClick={() => {
            handleSignOut;
            console.log(user)
          }}>Sign Out</Button>
        )}
      </div>
    </div>
  );
}
