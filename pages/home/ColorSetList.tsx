import React, { useState, useEffect, useContext } from "react";
import { getTextColor } from "@/lib/getTextColor";
import { useColor } from "@/contexts/ColorContext";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useFetchColorSets } from "../api/colorSets/fetchColorSet";

type Props = {};
interface ColorPreference {
  sixty: string | null;
  thirty: string | null;
  ten: string | null;
}

interface ColorSet {
  id: number;
  name?: string | null;
  user_id?: string | null;
  colorpreferences: ColorPreference[];
}

interface GroupedColorSets extends Array<ColorSet[]> {}

// Using arrow function and renaming chunkArray to groupColorSets
const groupColorSets = (
  arr: ColorSet[],
  chunkSize: number
): GroupedColorSets => {
  const groupedSets: GroupedColorSets = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    groupedSets.push(arr.slice(i, i + chunkSize));
  }
  return groupedSets;
};

export default function ColorSetList({}: Props) {
  const { user } = useContext(UserContext) ?? {};
  const { sixty, thirty, ten, createColorSet } = useColor();
  const colorSets = useFetchColorSets();
  const groupedColorSets: GroupedColorSets = groupColorSets(colorSets, 2);
  const [setName, setSetName] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const textColor = getTextColor(sixty);

  const handleAddColorSet = async () => {
    const userId = user?.id;
    await createColorSet(userId as string, setName);
  };

  return (
    <div className="h-[50%] flex flex-col justify-center items-center w-full">
      {!user ? (
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
      ) : (
        <div className="h-full flex flex-col justify-center items-center w-80">
          <div className="h-[90%] flex flex-row flex-nowrap items-center overflow-x-hidden gap-x-4 gap-y-2 max-w-[calc(100%/1.2)] mb-3">
            {groupedColorSets.map((group, groupIndex) => (
              <div
                className={`flex flex-row gap-x-4 transition-opacity duration-300 ease-in-out ${
                  currentSlide !== groupIndex ? "opacity-0" : "opacity-100"
                }`}
                key={groupIndex}
              >
                {group.map((set, index) => (
                  <div
                    key={index}
                    className="text-xs flex flex-col justify-center items-center font-bold"
                    style={{ color: textColor }}
                  >
                    {set.name ? set.name : "Unnamed Set"}
                    {set.colorpreferences.map((pref, idx) => (
                      <div key={idx}>
                        <div className="w-[100px] h-[20px] border border-black flex flex-row justify-center">
                          <div
                            style={{
                              backgroundColor: pref.sixty ?? "#000000",
                              color: getTextColor(pref.sixty ?? "#000000"),
                              boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                              border: "1px solid black",
                            }}
                            className="text-xs w-[45%] text-center"
                          >
                            60
                          </div>
                          <div
                            style={{
                              backgroundColor: pref.thirty ?? "#000000",
                              color: getTextColor(pref.thirty ?? "#000000"),
                              boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                              border: "1px solid black",
                            }}
                            className="text-xs w-[35%] text-center"
                          >
                            30
                          </div>
                          <div
                            style={{
                              backgroundColor: pref.ten ?? "#000000",
                              color: getTextColor(pref.ten ?? "#000000"),
                              boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                              border: "1px solid black",
                            }}
                            className="text-xs w-[30%] text-center"
                          >
                            10
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-center items-center">
            {groupedColorSets.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 w-3 rounded-full ${
                  currentSlide === index ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
          <div className="flex flex-row items-center justify-center gap-x-3">
            <Dialog>
              <DialogTrigger
                style={{
                  backgroundColor: ten,
                  color: getTextColor(ten),
                }}
                className="text-[12px] font-bold w-14 h-7 rounded-md"
              >
                Save
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save your Color Set</DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-col justify-start items-center mt-4 gap-y-5">
                      <Input
                        id="setName"
                        defaultValue="Name your color set."
                        onChange={(e) => setSetName(e.target.value)}
                        className="w-[60%] p-4 mt-2"
                      />
                      <div className="flex flex-row justify-center items-center gap-x-5">
                        <div
                          style={{
                            backgroundColor: sixty,
                            color: getTextColor(sixty),
                            boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                          }}
                          className="w-20 h-20 flex justify-center items-center"
                        >
                          {sixty}
                        </div>
                        <div
                          style={{
                            backgroundColor: thirty,
                            color: getTextColor(thirty),
                            boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                          }}
                          className="w-20 h-20 flex justify-center items-center"
                        >
                          {thirty}
                        </div>
                        <div
                          style={{
                            backgroundColor: ten,
                            color: getTextColor(ten),
                            boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                          }}
                          className="w-20 h-20 flex justify-center items-center"
                        >
                          {ten}
                        </div>
                      </div>
                      <div className="flex flex-row justify-center items-center gap-x-4">
                        <Button
                          onClick={handleAddColorSet}
                          style={{
                            backgroundColor: ten,
                            color: getTextColor(ten),
                            boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          variant={"destructive"}
                          style={{
                            boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          Go back
                        </Button>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Button
              size={"sm"}
              style={{
                backgroundColor: ten,
                color: getTextColor(ten),
              }}
              className="text-[12px] font-bold w-14 h-7"
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
