import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useColor } from "@/contexts/ColorContext";
import { NavLink } from "./NavLink";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getTextColor } from "@/lib/getTextColor";

type Props = {};

const MobileNavbar: React.FC<Props> = ({}) => {
  const { thirty } = useColor();
  const navTextColor = getTextColor(thirty);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
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
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
